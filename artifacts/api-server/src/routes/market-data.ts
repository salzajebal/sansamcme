import { Router } from "express";

const router = Router();

router.get("/market-data/nq", async (req, res) => {
  try {
    const response = await fetch(
      "https://query1.finance.yahoo.com/v8/finance/chart/NQ%3DF?interval=1m&range=1d",
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          "Accept": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Yahoo Finance responded with ${response.status}`);
    }

    const data = await response.json();
    const result = data?.chart?.result?.[0];

    if (!result) {
      throw new Error("No data returned from Yahoo Finance");
    }

    const meta = result.meta;
    const last = meta.regularMarketPrice ?? meta.previousClose ?? 0;
    const prevClose = meta.chartPreviousClose ?? meta.previousClose ?? last;
    const change = parseFloat((last - prevClose).toFixed(2));
    const changePct = prevClose !== 0 ? parseFloat(((change / prevClose) * 100).toFixed(2)) : 0;
    const volume = meta.regularMarketVolume ?? 0;
    const timestamp = meta.regularMarketTime
      ? new Date(meta.regularMarketTime * 1000).toISOString()
      : new Date().toISOString();

    res.json({
      symbol: "NQ",
      last: last,
      change: change,
      changePct: changePct,
      volume: volume,
      timestamp,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch market data");
    res.status(502).json({ error: "Failed to fetch market data" });
  }
});

export default router;
