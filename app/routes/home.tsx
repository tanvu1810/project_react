import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Test } from "../testUseState/test";
import { Counter } from "../testUseEffect/test";

import { App } from "~/to_do_list/base/app";
import { Caculator } from "~/testRustand/app";
import HomePage from "~/to_do_list/HomePage";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      {/* <Welcome /> */}
      {/* <Test /> */}
      {/* <Counter /> */}
      {/* <Caculator /> */}
      {/* <App /> */}
      <HomePage />
    </>
  );
}
