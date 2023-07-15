import {Suspense} from 'react';
import {ActivityIndicator, View} from 'react-native';

const Loader = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#171923',
    }}>
    <ActivityIndicator size="large" color={'black'} />
  </View>
);

const Loadable = Component => props =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
