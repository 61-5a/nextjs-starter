import cacheData from "memory-cache";

export default async function fetchWithCache(url, options) {
  const value = cacheData.get(url);
  if (value) {
    return {
      from: "cache",
      data: value,
    };
  } else {
    console.log("frm api");
    const hours = 24;
    const time = hours * 1000 * 60 * 60;
    const res = await fetch(url, options);
    const data = await res.json();
    cacheData.put(url, data, time);
    return {
      from: "API",
      data: data,
    };
  }
}
