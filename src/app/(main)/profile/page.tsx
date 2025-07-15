"use client";

import withAuth from "@/hoc/withAuth";
import useBootUser from "@/hooks/useBootUser";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const Profile = () => {
  const { user } = useBootUser();

  if (!user) return null;

  const { fullName, firstName, lastName, email, createdAt }: any = user && user;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <Card className="shadow-xl rounded-2xl">
        <CardHeader className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={`https://ui-avatars.com/api/?name=${fullName}`}
              alt={fullName}
            />
            <AvatarFallback>
              {firstName?.charAt(0)}
              {lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl font-bold">{fullName}</CardTitle>
            <p className="text-muted-foreground text-sm">{email}</p>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-muted-foreground">First Name</p>
              <p>{firstName}</p>
            </div>
            <div>
              <p className="font-semibold text-muted-foreground">Last Name</p>
              <p>{lastName}</p>
            </div>
            {/* <div>
              <p className="font-semibold text-muted-foreground">User ID</p>
              <p>{user.id}</p>
            </div> */}
            <div>
              <p className="font-semibold text-muted-foreground">Joined On</p>
              <p>{format(new Date(createdAt), "dd MMM yyyy, hh:mm a")}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default withAuth(Profile);
