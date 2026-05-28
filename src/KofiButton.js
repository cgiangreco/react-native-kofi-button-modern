import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const CUP_URI = "https://storage.ko-fi.com/cdn/cup-border.png";

export default function KofiButton({
  kofiId,
  color = "#72a4f2",
  label = "Support me on Ko-fi",
  useSeparator = false,
  dismissible = true,
  dismissable,
}) {
  const [visible, setVisible] = useState(true);
  const wobble = useRef(new Animated.Value(0)).current;
  const showClose = dismissable ?? dismissible;
  const url = useMemo(() => `https://ko-fi.com/${kofiId}`, [kofiId]);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(2400),
        Animated.timing(wobble, {
          toValue: 1,
          duration: 220,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(wobble, {
          toValue: -1,
          duration: 140,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(wobble, {
          toValue: 1,
          duration: 140,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(wobble, {
          toValue: -1,
          duration: 140,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(wobble, {
          toValue: 0,
          duration: 180,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [wobble]);

  if (!visible) {
    return null;
  }

  const rotation = wobble.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["-15deg", "0deg", "15deg"],
  });

  const scale = wobble.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [1.08, 1, 1.08],
  });

  return (
    <View pointerEvents="box-none" style={styles.overlay}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: color,
            shadowColor: "#000",
          },
        ]}
      >
        <Pressable
          accessibilityRole="link"
          onPress={() => {
            void Linking.openURL(url);
          }}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Animated.View
            style={[
              styles.iconWrap,
              {
                transform: [{ rotate: rotation }, { scale }],
              },
            ]}
          >
            <Image source={{ uri: CUP_URI }} style={styles.icon} />
          </Animated.View>
          <Text numberOfLines={1} style={styles.label}>
            {label}
          </Text>
        </Pressable>
        {showClose ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Dismiss"
            onPress={() => setVisible(false)}
            style={({ pressed }) => [
              styles.closeButton,
              useSeparator && styles.closeButtonSeparated,
              pressed && styles.closeButtonPressed,
            ]}
          >
            <Text style={styles.closeText}>×</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    alignItems: "center",
    bottom: 28,
    left: 16,
    position: "absolute",
    right: 16,
    zIndex: 90,
  },
  container: {
    alignItems: "stretch",
    borderRadius: 16,
    elevation: 6,
    flexDirection: "row",
    maxWidth: 420,
    overflow: "hidden",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: Platform.OS === "android" ? 0.28 : 0.2,
    shadowRadius: 12,
  },
  button: {
    alignItems: "center",
    flexDirection: "row",
    flexShrink: 1,
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  iconWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 18,
    width: 18,
  },
  label: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: -0.15,
    lineHeight: 18,
  },
  closeButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 12,
    paddingLeft: 2,
    paddingRight: 16,
    paddingTop: 12,
  },
  closeButtonSeparated: {
    borderLeftColor: "rgba(255,255,255,0.18)",
    borderLeftWidth: 1,
    paddingHorizontal: 14,
  },
  closeButtonPressed: {
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  closeText: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 18,
  },
});
