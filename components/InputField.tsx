// InputField.tsx
import React, { forwardRef, useMemo, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

type Props = {
  label?: string;
  helperText?: string;
  errorText?: string;
  containerStyle?: object;
  labelStyle?: object;
  inputStyle?: object;
  left?: React.ReactNode; // e.g. an icon
  right?: React.ReactNode; // e.g. an icon (ignored if secureToggle is true)
  floatingLabel?: boolean;
  secureToggle?: boolean; // adds eye/eye-off toggle for password
} & TextInputProps;

const InputField = forwardRef<TextInput, Props>(
  (
    {
      label,
      value,
      onChangeText,
      placeholder,
      helperText,
      errorText,
      containerStyle,
      labelStyle,
      inputStyle,
      left,
      right,
      floatingLabel = true,
      secureTextEntry,
      secureToggle = false,
      editable = true,
      ...rest
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const [hide, setHide] = useState(!!secureTextEntry);

    const hasError = !!errorText;
    const showFloating = floatingLabel && (focused || (value ?? "").length > 0);

    const borderColor = useMemo(() => {
      if (!editable) return "#E5E7EB";
      if (hasError) return "#EF4444";
      if (focused) return "#3B82F6";
      return "#D1D5DB";
    }, [editable, hasError, focused]);

    return (
      <View style={[styles.container, containerStyle]}>
        {/* Label (floating or static) */}
        {label ? (
          floatingLabel ? (
            <Text
              style={[
                styles.label,
                {
                  top: showFloating ? 2 : 18,
                  fontSize: showFloating ? 12 : 16,
                  color: showFloating ? "#6B7280" : "#9CA3AF",
                },
                labelStyle,
              ]}
              accessibilityLabel={`${label} label`}
            >
              {label}
            </Text>
          ) : (
            <Text style={[styles.staticLabel, labelStyle]}>{label}</Text>
          )
        ) : null}

        <View
          style={[
            styles.field,
            { borderColor, backgroundColor: editable ? "#FFFFFF" : "#F3F4F6" },
          ]}
        >
          {left ? <View style={styles.affix}>{left}</View> : null}

          <TextInput
            ref={ref}
            style={[styles.input, inputStyle]}
            value={value}
            onChangeText={onChangeText}
            placeholder={
              floatingLabel ? (showFloating ? placeholder : "") : placeholder
            }
            placeholderTextColor="#9CA3AF"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            secureTextEntry={secureToggle ? hide : secureTextEntry}
            editable={editable}
            accessibilityLabel={label || placeholder}
            {...rest}
          />

          {/* Right icon or secure toggle */}
          {secureToggle ? (
            <Pressable
              onPress={() => setHide((p) => !p)}
              style={styles.affix}
              accessibilityRole="button"
              accessibilityLabel={hide ? "Show password" : "Hide password"}
            >
              <Text>{hide ? "👁️‍🗨️" : "👁️"}</Text>
            </Pressable>
          ) : right ? (
            <View style={styles.affix}>{right}</View>
          ) : null}
        </View>

        {/* Helper / Error */}
        {hasError ? (
          <Text style={styles.errorText}>{errorText}</Text>
        ) : helperText ? (
          <Text style={styles.helperText}>{helperText}</Text>
        ) : null}
      </View>
    );
  }
);

export default InputField;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 8,
  },
  label: {
    position: "absolute",
    left: 14,
    zIndex: 1,
  },
  staticLabel: {
    marginBottom: 6,
    fontSize: 14,
    color: "#6B7280",
  },
  field: {
    minHeight: 54,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#111827",
  },
  affix: {
    paddingHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  helperText: {
    marginTop: 6,
    fontSize: 12,
    color: "#6B7280",
  },
  errorText: {
    marginTop: 6,
    fontSize: 12,
    color: "#EF4444",
  },
});
