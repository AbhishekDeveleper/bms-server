import cluster from "node:cluster";
import numCPUs from "node:os";
import process from "node:process";
import { app } from "./index.js";

if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs.availableParallelism(); i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `worker with process id ${process.pid} is died bysignal ${signal}`
    );
  });
} else {
  const server = app.listen(3000, () => {
    console.log(
      `server listening on port 3000 with process id => ${process.pid}`
    );
  });
  process.on(
    "unhandledRejection",
    (error: { name?: string; message?: string }) => {
      console.log(`Unhandled rejection  🎇 shutting down system`);
      console.log(error);
      server.close(() => {
        process.exit(1);
      });
    }
  );
}
