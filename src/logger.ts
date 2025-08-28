import  { benchmarkCache } from './utils'
import { BenchmarkData } from './main.types';

export function logger(datas: BenchmarkData) {
  console.log("%c🚀 Performance Comparison", "color: #4F46E5; font-size: 16px; font-weight: bold; background: linear-gradient(90deg, #E0E7FF, #C7D2FE); padding: 8px 16px; border-radius: 6px; margin: 4px 0;");

  const mapCache = new datas.map;
  const mapTime = benchmarkCache(mapCache, datas.users, datas.operations);
  console.log("%c📊 Map-based cache: %c" + mapTime.toFixed(2) + "ms", 
    "color: #059669; font-weight: 600;", 
    "color: #059669; font-weight: bold; background: #FEF2F2; padding: 2px 6px; border-radius: 4px;"
  );

  const objectCache = new datas.object;
  const objectTime = benchmarkCache(objectCache, datas.users, datas.operations);
  console.log("%c📊 Object-based cache: %c" + objectTime.toFixed(2) + "ms", 
    "color: #059669; font-weight: 600;", 
    "color: #DC2626; font-weight: bold; background: #FEF2F2; padding: 2px 6px; border-radius: 4px;"
  );

  const improvement = ((objectTime - mapTime) / objectTime * 100).toFixed(1);
  const improvementColor = parseFloat(improvement) > 0 ? "#059669" : "#DC2626";
  console.log("%c⚡ Performance improvement: %c" + improvement + "%", 
    "color: #7C3AED; font-weight: 600;", 
    `color: ${improvementColor}; font-weight: bold; font-size: 14px; background: #F0FDF4; padding: 4px 8px; border-radius: 4px; border: 1px solid #BBF7D0;`
  );

  console.log("%c✨ Key Advantages of Map", "color: #eab308; font-size: 14px; font-weight: bold; background: linear-gradient(90deg, #111827, #020617); padding: 6px 12px; border-radius: 6px; margin: 8px 0;");
  console.log("%c• %cO(1) average time complexity for get/set/has/delete", "color: #10B981; font-weight: bold;", "color: #64748b; font-weight: 500;");
  console.log("%c• %cConstant time size property", "color: #10B981; font-weight: bold;", "color: #67e8f9; font-weight: 500;");
  console.log("%c• %cNo prototype pollution issues", "color: #10B981; font-weight: bold;", "color: #67e8f9; font-weight: 500;");
  console.log("%c• %cBetter memory management", "color: #10B981; font-weight: bold;", "color: #67e8f9; font-weight: 500;");
  console.log("%c• %cIterable by default", "color: #10B981; font-weight: bold;", "color: #67e8f9; font-weight: 500;");
}
