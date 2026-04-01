"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FormEvent, useRef, useState } from "react";

type Answer = {
  summary: string;
  confidence: number;
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([]);
  //  why we write it as :< >
  // useState<ANSWER[]> TypeScript ka generic type hota hai jo React ko batata hai ki is state ke andar kaun-sa data type store hoga. Jab hum <ANSWER[]> likhte hain, iska simple matlab hota hai ki ye state ek array hogi, aur us array ke andar sirf ANSWER type ke objects hi allowed honge. TypeScript ko yeh batana zaroori hota hai, taaki woh code samajh sake, suggestions de sake, aur galat type ke values detect kar sake. Agar hum type nahi dete, jaise useState([]), to React ko nahi pata hota ki array me kis type ka data aayega—string? number? object?—is wajah se errors aa sakte hain. Isliye hum <ANSWER[]> likhkar clear kar dete hain ki yeh state ek empty array se start hogi, aur baad me isme ANSWER type ke multiple objects stored honge. यह बस TypeScript ko data ka structure samjhaane ke liye hota hai.


  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ✅ “TypeScript ko bata rahe ho ki yeh ref kis type ke HTML element ko point karega.”// HTMLFormElement → matlab yeh ref form tag ko point karega. HTMLInputElement → matlab yeh ref input tag ko point karega
// Iska simple meaning:

// 👉 "TypeScript, yeh form wala ref sirf <form> tag ka hi reference rakh sakta hai."
// 👉 "Aur yeh input wala ref sirf <input> tag ka reference rakh sakta hai."
// Yani tum TypeScript ko bol rahi ho:
// "Bhai, mera ref ek specific HTML element ka hoga, so please type-checking sahi rakhna."

// we need it bcz for ef we  directly wirte const nputref= useref(null); then typescript sdont know ye <input> hh <form> hh /<div> hh ya button so when we aplly like imputref.focus() it shows error bcz it sdont know ki ye input hh ya nhi so we tell it specifically ki ye input hh so we mention above 

async function handleQuerySubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = query.trim();

    if (!q || loading) return;
    setLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: q }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const { summary, confidence } = data as {
        summary: string;
        confidence: number;
      };

      setAnswers((prev) => [{ summary, confidence }, ...prev]);
      setQuery("");
      inputRef.current?.focus();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-dvh w-full  border-amber-600 bg-black">
      <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-4 pb-24 pt-8">
        <header className="mb-4">
          <h1 className="text-xl font-semibold tracking-tight text-white">
            Hello Agent - Ask anything......
          </h1>
        </header>
        
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Answers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {answers.length === 0 ? (
              <p className="text-sm text-zinc-600">
                No answers yet. Ask a question below
              </p>
            ) : (
              answers.map((ans, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-pink-800 p-3"
                >
                  <div className="text-sm leading-6">{ans.summary}</div>
                  <div className="mt-1 text-xs text-zinc-500">
                    Confidence: {ans.confidence.toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>


        <form
          ref={formRef}
          onSubmit={handleQuerySubmit}
          className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-2xl px-4 py-4 backdrop-blur"
        >
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type your questions and press"
              disabled={loading}
              className="h-11 text-white"
            />

            <Button type="submit" disabled={loading} className="h-11">
              {loading ? "Thinking..." : "Ask"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

//  as here i write export async  function Home() whihc is worng :

// The reason you are doing this is probably because you want to perform some asynchronous operation inside your component, like fetching data from an API, and you assumed that making the component async will allow you to await inside it. While the intention is correct—fetching data asynchronously—the way it is being done is not compatible with normal React function components. The problem arises because async functions always return a Promise. In React, a function component is expected to return JSX directly, not a Promise. If React receives a Promise instead of JSX, it cannot render it and will throw an error, usually something like “Objects are not valid as a React child.” This is why exporting your component as async leads to errors.

// The correct way to handle asynchronous operations in a React component is to keep the component itself synchronous and use async functions inside event handlers or React hooks like useEffect. For example, if you want to fetch data when the component loads, you can define an async function inside useEffect and call it there. This allows you to await asynchronous operations without making the component itself async. Similarly, if you want to fetch data when a form is submitted or a button is clicked, you can define an async function as the event handler and call it there. In all these cases, React still receives JSX from the component immediately, so it can render correctly.

// There is an exception in Next.js 13+ server components, where you can make the component async because the server can wait for the Promise to resolve before sending the HTML to the browser. However, in normal client-side React, making a component async will not work.

// So in short: making the component async is wrong because React expects JSX, not a Promise. To do asynchronous tasks safely, use useEffect for side effects or async event handlers, while keeping the component itself synchronous. This is why your attempt to export async function with JSX inside is producing an error.

