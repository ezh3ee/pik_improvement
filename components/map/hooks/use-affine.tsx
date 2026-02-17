import { useCallback } from "react";

// type AffineParams = {
//   pt: number[];
//   imagePoints: number[][];
//   mapPoints: number[][];
// };

export default function useAffine() {
  return useCallback(() => {
    const params = {
      a: 1, // a = s * cosθ
      b: 0, // b = s * sinθ
      tx: 0,
      ty: 0,
    };

    const transform = (pt: number[]) => {
      console.log("transform", pt);
      // image -> map
      const x = params.a * pt[0] - params.b * pt[1] + params.tx;
      const y = params.b * pt[0] + params.a * pt[1] + params.ty;
      return [x, y];
    };

    const inverseTransform = (pt: number[]) => {
      console.log("inverseTransform", pt);
      // map -> image
      const det = params.a * params.a + params.b * params.b;
      if (!det) throw new Error("Similarity inverse: singular");
      const dx = pt[0] - params.tx;
      const dy = pt[1] - params.ty;
      const x = (params.a * dx + params.b * dy) / det;
      const y = (-params.b * dx + params.a * dy) / det;
      return [x, y];
    };

    const calculate = (imagePoints: number[][], mapPoints: number[][]) => {
      // imagePoints: [ [u,v], ... ]  (bottom-left origin)
      // mapPoints: [ [X,Y], ... ]    (EPSG:3857 coords like fromLonLat)
      const n = imagePoints.length;
      if (n < 2) throw new Error("Need at least 2 points");
      if (n !== mapPoints.length) throw new Error("Point arrays size mismatch");

      // barycenters
      let mx = 0,
        my = 0,
        MX = 0,
        MY = 0;
      for (let i = 0; i < n; i++) {
        mx += imagePoints[i][0];
        my += imagePoints[i][1];
        MX += mapPoints[i][0];
        MY += mapPoints[i][1];
      }
      mx /= n;
      my /= n;
      MX /= n;
      MY /= n;

      // sums
      let Sxx = 0,
        Sxy = 0,
        Syx = 0,
        Syy = 0,
        S = 0;
      for (let i = 0; i < n; i++) {
        const x = imagePoints[i][0] - mx;
        const y = imagePoints[i][1] - my;
        const X = mapPoints[i][0] - MX;
        const Y = mapPoints[i][1] - MY;

        Sxx += x * X;
        Sxy += y * X;
        Syx += x * Y;
        Syy += y * Y;
        S += x * x + y * y;
      }
      if (!S) throw new Error("Degenerate point configuration");

      const a = (Sxx + Syy) / S;
      const b = (Syx - Sxy) / S;

      const tx = MX - a * mx + b * my;
      const ty = MY - b * mx - a * my;

      params.a = a;
      params.b = b;
      params.tx = tx;
      params.ty = ty;

      return {
        scale: Math.hypot(a, b),
        rotation: Math.atan2(b, a),
        translation: [tx, ty],
      };
    };
    return { calculate, transform, inverseTransform };
  }, [])();
}
