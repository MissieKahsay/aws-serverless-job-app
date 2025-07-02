document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const userId = document.getElementById("userId").value;
  const file = document.getElementById("fileInput").files[0];
  const fileName = file.name;

  const status = document.getElementById("status");
  status.textContent = "Generating upload URL...";

  try {
    // Step 1: Get pre-signed URL
    const response = await fetch(
      "https://hp04anupwj.execute-api.us-east-2.amazonaws.com/prod/generate-upload-url",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, fileName }),
      }
    );

    const data = await response.json();
    const uploadUrl = data.uploadUrl;

    // Step 2: Upload file to S3
    await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/pdf" },
      body: file,
    });

    // Step 3: Submit metadata
    await fetch(
      "https://hp04anupwj.execute-api.us-east-2.amazonaws.com/prod/submit",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, fileName }),
      }
    );

    status.textContent = "✅ Resume uploaded and submitted successfully!";
  } catch (err) {
    console.error(err);
    status.textContent = "❌ Something went wrong!";
  }
});
