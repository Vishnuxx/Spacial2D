export class BrushUtils {
  static midPointBtw(point1 , point2) {
    return {
      x: point1.x + (point2.x - point1.x) / 2,
      y: point1.y + (point2.y - point1.y) / 2,
    };
  }

  static distanceBetween(point1, point2) {
    return Math.sqrt(
      Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
    );
  }
  static angleBetween(point1, point2) {
    return Math.atan2(point2.x - point1.x, point2.y - point1.y);
  }

   static getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
}
