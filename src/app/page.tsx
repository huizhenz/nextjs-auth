"use client";

// React
import * as React from "react";

// shadcn
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// zod & react-hook-form & userSchema
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userSchema } from "@/validators/auth";

// Next.js Image Component
import Image from "next/image";

import Link from "next/link";

type userType = z.infer<typeof userSchema>;

export default function Home() {
  const form = useForm<userType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      sex: "",
      terms: false,
    },
  });

  return (
    <div className="my-16 mx-auto">
      <Card className="w-[480px]">
        <CardHeader>
          {/* 이미지를 가운데 배치하기 위해 부모 요소에 css */}
          <div className="flex justify-center">
            {/* 상대경로에서 /사용, width height값 꼭 지정, <Image /> 컴포넌트를 사용하는 것을 고려 */}
            <Image width={200} height={100} src="/logo.png" alt="Logo Image" />{" "}
          </div>
        </CardHeader>

        <Form {...form}>
          <form className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="이메일" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="text" placeholder="비밀번호" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <CardFooter className="flex justify-center">
              <Button type="submit" variant="primary">
                로그인
              </Button>
            </CardFooter>{" "}
          </form>
        </Form>
        <div className="text-base text-center">
          아직 회원이 아니신가요?&nbsp;
          <Link href="/signup" className="text-primaryColor font-extrabold">
            회원가입
          </Link>
        </div>
      </Card>
    </div>
  );
}
