// components/CursoSkeleton.tsx
import { Card, Skeleton } from "@heroui/react";

export default function CursoSkeleton() {
  return (
    <Card className="w-full h-screen space-y-5 p-4 bg-gradient-to-br from-[#0F172A] to-[#1E293B]" radius="lg">
      <Skeleton className="rounded-lg w-full h-3/4">
        <div className="h-full rounded-lg bg-default-300" />
      </Skeleton>
      <div className="space-y-3 px-4">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-4 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-4 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-4 w-2/5 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    </Card>
  );
}
