import moment from "moment";

export function formatDate(date) {
  return moment(date).format("ddd, MMM Do, YYYY");
}

export function formatTime(time) {
  return moment(time).format("LT");
}

export function formatPrice(price) {
  let priceNumber;
  if (typeof price === "string") {
    priceNumber = parseFloat(price);
  } else if (typeof price === "number") {
    priceNumber = price;
  } else {
    return "";
  }
  return priceNumber.toFixed(2);
}
