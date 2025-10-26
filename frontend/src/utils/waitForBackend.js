export async function waitForBackend(url, maxRetries = 10, delay = 3000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, { method: "GET" });
      if (response.ok) {
        console.log("✅ Backend is awake!");
        return true;
      }
    } catch (err) {
      console.log(`⏳ Backend still asleep... retrying (${i + 1}/${maxRetries})`);
    }
    await new Promise((res) => setTimeout(res, delay)); // wait a bit before retrying
  }
  throw new Error("❌ Backend failed to wake up in time.");
}
