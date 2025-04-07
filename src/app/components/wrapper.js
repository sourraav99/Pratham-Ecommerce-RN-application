import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const Wrapper = ({ children, safeAreaContainerStyle, useBottomInset = true,useTopInsets=true }) => {
  const insets=useSafeAreaInsets()
  return (
    <View style={[styles.safeAreaContainer, safeAreaContainerStyle]}>
      {useTopInsets&&<View style={{paddingTop:insets.top,}}/>}
      
        {children}
        {useBottomInset && <View style={{ paddingBottom: insets.bottom }} />}
        {/* <View style={{ paddingBottom: insets.bottom }} /> */}
    </View >
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    // backgroundColor: 'pink',
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

export default Wrapper;



// import { View, Text, StyleSheet } from 'react-native';
// import React from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';

// export default function Wrapper({ children, safeAreaContainerStyle,containerStyle }) {
//   return (
//     <View style={{...styles.safeAreaContainer,... safeAreaContainerStyle}}>
//       <View/>
//       <View style={{...styles.container,...containerStyle}}>
//         {children}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   safeAreaContainer: {
//     backgroundColor: 'pink',
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//     // backgroundColor: 'blue',
//   },
// });
