import express from "express";
import { ContentModel, LinkModel, userModel } from "./db";
import Jwt from "jsonwebtoken";
import { UserMiddleWare } from "./middleware";
import { z } from "zod";
import bcrypt from "bcrypt";
import { random } from "./utils";
import cors from "cors";

const JWT_PASSWORD = "!24435f";
const app = express();

const UsernewSchema = z.object({
  username: z.string().min(3, { message: "atleast 3 character" }),
  password: z.string().min(6, { message: "Atleast 6 charcter long" }),
});

app.use(express.json());
app.use(cors());

// Signup
app.post("/api/v1/signup", async (req, res) => {
  const result = UsernewSchema.safeParse(req.body);
  if (!result.success) {
    res.status(404).json({
      msg: "Please enter valid credentials",
    });
    return;
  }

  const { username, password } = result.data;
  const existingUser = await userModel.findOne({ username });
  if (existingUser) {
    res.status(404).json({
      msg: "User already exists",
    });
    return;
  }

  const newPassword = await bcrypt.hash(password, 10);

  try {
    await userModel.create({
      username,
      password: newPassword,
    });

    res.status(200).json({
      msg: "User Signed Up Successfully",
    });
    return;
  } catch (error) {
    res.status(500).json({
      msg: "Server error",
      error,
    });
    return;
  }
});

// Signin
app.post("/api/v1/signin", async (req, res) => {
  const result = UsernewSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      msg: "Please enter valid credentials",
      error: result.error.format(),
    });
    return;
  }

  const { username, password } = result.data;
  const existingUser = await userModel.findOne({ username });

  if (!existingUser) {
    res.status(403).json({
      msg: "User does not exist",
    });
    return;
  }
 //@ts-ignore
  const isValid = await bcrypt.compare(password, existingUser.password);
  if (!isValid) {
    res.status(401).json({
      msg: "Invalid password",
    });
    return;
  }

  const token = Jwt.sign({ id: existingUser._id }, JWT_PASSWORD);

  res.status(200).json({
    msg: "Login successful",
    token,
  });
  return;
});

// Create content
app.post("/api/v1/content", UserMiddleWare, async (req, res) => {
  const { link, type, title } = req.body;

  await ContentModel.create({
    link,
    type,
    title,
    //@ts-ignore
    userId: req.userId,
    tags: [],
  });

  res.status(200).json({
    msg: "Content Added Successfully",
  });
  return;
});

// Get content
app.get("/api/v1/content", UserMiddleWare, async (req, res) => {
  const content = await ContentModel.find({
    //@ts-ignore
    userId: req.userId,
  }).populate("userId", "username");

  res.status(200).json({
    content,
  });
  return;
});

// Delete content
app.delete("/api/v1/content", UserMiddleWare, async (req, res) => {
  const contentId = req.body.contentId;
  await ContentModel.deleteMany({
    contentId,
    //@ts-ignore
    userId: req.userId,
  });

  res.status(200).json({
    msg: "Deleted Content",
  });
  return;
});

// Share brain
app.post("/api/v1/breain/share", UserMiddleWare, async (req, res) => {
  const share = req.body.share;

  if (share) {
    const existingLink = await LinkModel.findOne({
        //@ts-ignore
      userId: req.userId,
    });

    if (existingLink) {
      res.status(200).json({
        hash: existingLink.hash,
      });
      return;
    }

    const hash = random(10);
    await LinkModel.create({
        //@ts-ignore
      userId: req.userId,
      hash: hash,
    });

    res.status(200).json({
      msg: "/share/" + hash,
    });
    return;
  } else {
    await LinkModel.deleteOne({
        //@ts-ignore
      userId: req.userId,
    });

    res.status(200).json({
      msg: "removed Link",
    });
    return;
  }
});

// Get shared content
app.post("/api/v1/breain/share/:sharelink", async (req, res) => {
  const hash = req.params.sharelink;

  const link = await LinkModel.findOne({ hash });

  if (!link) {
    res.status(411).json({
      msg: "Sorry, link is invalid",
    });
    return;
  }

  const content = await ContentModel.findOne({
    userId: link.userId,
  });

  const user = await userModel.findById(link.userId);

  if (!user) {
    res.status(411).json({
      msg: "User not found — error should ideally not happen",
    });
    return;
  }

  res.status(200).json({
    username: user.username,
    content: content,
  });
  return;
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
