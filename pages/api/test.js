export default function test(req, res) {
  res.status(200).json({ name: "Test", app: "App.js" });
}
