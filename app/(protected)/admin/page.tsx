"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import RoleGate from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";
import { admin } from "@/actions/admin";

function AdminPage() {
  function onApiRouteClick() {
    fetch("/api/admin").then((res) => {
      if (res.ok) {
        toast.success("Allowed API Route");
      } else {
        toast.error("Forbidden API Route!");
      }
    });
  }

  function onServerActionClick() {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error);
      }

      if (data.success) {
        toast.success(data.success);
      }
    });
  }
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Admin Page</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content" />
        </RoleGate>
        <div className=" flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p>Admin Only API Route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>
        <div className=" flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p>Admin Only Server Action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default AdminPage;

// "use server";

// import { currentRole } from "@/lib/auth";

// async function AdminPage() {
//   const role = await currentRole();
//   return (
//     <Card>
//       <CardHeader>Admin Page</CardHeader>
//       <CardContent> Current Role: {role}</CardContent>
//     </Card>
//   );
// }

// export default AdminPage;
