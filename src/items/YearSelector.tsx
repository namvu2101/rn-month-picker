import { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import dayjs from 'dayjs';
import type { TYearProps } from '../type';
import { useStateMonthPicker } from '../modules/useStateMonthPicker';

export function YearSelector({
  yearStyle,
  minDate,
  maxDate,
}: Readonly<TYearProps>) {
  const [data, setData] = useStateMonthPicker();
  const refScroll = useRef<ScrollView>(null);
  const type = data.type;
  const year = data.year;
  const [yOffset, setYOffset] = useState(0);

  const startYear = 1900;
  const years = Array.from({ length: 200 }, (_, i) => startYear + i);
  const index = years.findIndex((y) => y === year);
  const maxYear = dayjs(maxDate).year();
  const minYear = dayjs(minDate).year();

  useEffect(() => {
    setYOffset((index / 3) * 50);
  }, [type, index]);

  if (type === 'month') {
    return null;
  }

  const renderItem = ({ item }: { item: number }) => {
    let bgActive;
    let textActive;
    let disable = false;
    if (item === year) {
      bgActive = {
        backgroundColor: 'blue',
      };
      textActive = { color: 'white' };
    }
    if ((maxDate && item > maxYear) || (minDate && item < minYear)) {
      disable = true;
      bgActive = {
        backgroundColor: '#ccc',
      };
      textActive = { color: '#a0a0a0' };
    }
    return (
      <Pressable
        key={item}
        style={{ width: '33.3%' }}
        disabled={disable}
        onPress={() => setData({ ...data, year: item })}
      >
        <View
          style={[
            {
              padding: 15,
              margin: 2,
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: 8,
              borderColor: 'blue',
              backgroundColor: 'white',
            },
            yearStyle?.style,
            bgActive,
          ]}
        >
          <Text key={item} style={[yearStyle?.textStyle, textActive]}>
            {item}
          </Text>
        </View>
      </Pressable>
    );
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScrollView ref={refScroll} contentOffset={{ x: 0, y: yOffset }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {years.map((item) => renderItem({ item }))}
        </View>
      </ScrollView>
    </View>
  );
}
