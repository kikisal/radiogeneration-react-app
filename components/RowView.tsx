import { Text, StyleSheet, View, ViewProps } from 'react-native';

type RowProps = ViewProps;

export function RowView({
  style,
  ...rest
} : RowProps) {

  return (
    <View style={[style, styles.rowStyle]} {...rest}></View>
  );
}

const styles = StyleSheet.create({
  rowStyle: {
    flexDirection: "row",
    alignItems: "center"
  }
});

