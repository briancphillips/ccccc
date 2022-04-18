export function intersect(obj1,obj2) {
return obj1.x + obj1.r >= obj2.x &&
      obj1.x - obj1.r <= obj2.x + obj2.w &&
      obj1.y + obj1.r >= obj2.y &&
      obj1.y - obj1.r <= obj2.y + obj2.h
}