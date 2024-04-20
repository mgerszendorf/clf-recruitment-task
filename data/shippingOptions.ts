export const shippingOptions = [
    { value: "standard", label: "Standardowa" },
    { value: "express", label: "Ekspresowa" }
];

export const getShippingOptions = (country: string) => {
    if (country === "Polska") {
        return shippingOptions;
    }
    return shippingOptions.filter(option => option.value === "standard");
};
