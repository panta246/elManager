import { useEffect, useState } from "react";

export function useStatistics(dataPointCount: number): Statistics[] {
  const [value, setValue] = useState<Statistics[]>([]);

  useEffect(() => {
    const unSubscribe = window.electron.subscribeStatistics((stats) =>
      setValue((perv) => {
        const newData = [...perv, stats];

        if (newData?.length > dataPointCount) {
          newData.shift();
        }

        return newData;
      })
    );
    return unSubscribe;
  }, []);

  return value;
}
