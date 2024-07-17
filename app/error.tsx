"use client";

function Error({ error }) {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h2 className="text-3xl font-black">Error</h2>
      <div>{error.message}</div>
    </div>
  );
}

export default Error;
