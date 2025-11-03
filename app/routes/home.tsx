import type { Route } from "./+types/home";

import HomePage from "~/to_do_list/useTanStackQuery/HomePage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  // return (
  //   <>
  //     <QueryClientProvider client={queryClient}>
  //       <App />
  //     </QueryClientProvider>
  //   </>
  // );

  return (
    <>
      {/* <Welcome /> */}
      {/* <Test /> */}
      {/* <Counter /> */}
      {/* <App /> */}
      <HomePage />
    </>
  );
}
