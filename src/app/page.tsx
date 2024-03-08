"use client";

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

// zod & react-hook-form & userSchema
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userSchema } from "@/validators/auth";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { toast } from "@/components/ui/use-toast";

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

  const onSubmit = (data: userType) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  console.log(form.watch());

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card className="w-[450px]">
        <CardHeader>
          {/* 이미지를 가운데 배치하기 위해 부모 요소에 css */}
          <div className="flex justify-center">
            {/* 상대경로에서 /사용, width height값 꼭 지정, <Image /> 컴포넌트를 사용하는 것을 고려 */}
            <Image width={170} height={100} src="/logo.png" alt="Logo Image" />{" "}
          </div>
        </CardHeader>

        {/* css 의문 */}
        <div className="grid w-full items-center gap-4">
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" space-y-6"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormMessage />
                      <FormControl>
                        <Input placeholder="이름" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormMessage />
                      <FormControl>
                        <Input placeholder="이메일" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormMessage />
                      <FormControl>
                        {/* 비밀번호 type 설정 필수, input에다가 */}
                        <Input
                          placeholder="비밀번호"
                          type={"password"}
                          {...field}
                        />
                      </FormControl>
                      <div className="text-xs pl-1">
                        영문, 숫자, 특수문자(!@$%&*?) 조합 8~15자리
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormMessage />
                      <FormControl>
                        <Input
                          placeholder="비밀번호 확인"
                          type={"password"}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Radio Group */}
                <FormField
                  control={form.control}
                  name="sex"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel>성별</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-6 space-y-1.5 "
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="male" />
                            </FormControl>
                            <FormLabel className="font-normal">남자</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="female" />
                            </FormControl>
                            <FormLabel className="font-normal">여자</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="none" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              선택 안함
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Check Box */}
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          이용약관 및 개인정보 처리방침에 동의합니다.
                        </FormLabel>
                        {/* <FormDescription>
                  You can manage your mobile notifications in the{" "}
                  <Link href="/examples/forms">mobile settings</Link> page.
                </FormDescription> */}
                      </div>
                    </FormItem>
                  )}
                />

                {/* <div className="flex justify-center items-center space-x-1.5"> </div> */}

                <CardFooter className="flex justify-center">
                  <Button type="submit">가입하기</Button>
                </CardFooter>
              </form>
            </Form>
            <div className="text-center">이미 회원이신가요? 로그인</div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
