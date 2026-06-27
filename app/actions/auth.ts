"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password || !name) {
      return { error: "Veuillez remplir tous les champs" };
    }

    const exist = await prisma.user.findUnique({
      where: { email },
    });

    if (exist) {
      return { error: "Cet email est déjà utilisé" };
    }

    // Generate a unique username from name
    const baseUsername = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
    let username = baseUsername;
    let counter = 1;
    
    while (true) {
      const existingUser = await prisma.user.findUnique({ where: { username } });
      if (!existingUser) break;
      username = `${baseUsername}-${counter}`;
      counter++;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        username,
        role: "JUSTICIABLE",
      },
    });

    return { success: true, user: { email: user.email, name: user.name } };
  } catch (error) {
    console.error("REGISTRATION_ERROR", error);
    return { error: "Une erreur interne est survenue" };
  }
}
