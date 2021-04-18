import { FC, memo, Suspense } from "react";

const PageLoading = memo(() => <div></div>);

export const Suspencer: FC<ISuspencer> = memo(({ children }) => {
  return <Suspense fallback={<PageLoading />}>{children}</Suspense>;
});
