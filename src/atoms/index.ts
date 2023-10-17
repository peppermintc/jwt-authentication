"use client";

import { UserInfo } from "@/types";
import { atom } from "recoil";

const userInfoAtom = atom<UserInfo | null>({
  key: "userInfoState",
  default: null,
});

export { userInfoAtom };
