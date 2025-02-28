import React, { useState } from "react";
import { View, Text, KeyboardAvoidingView, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons"; // Using Ionicons for icons
import Icon from "react-native-vector-icons/Ionicons";

// Sample data for flowers
const trendingTools = [
    { id: '1', name: 'Angle Grinder', price: '$50', image: 'https://example.com/grinder.jpg' },
    { id: '2', name: 'Cordless Drill', price: '$80', image: 'https://example.com/drill.jpg' },
    { id: '3', name: 'Circular Saw', price: '$120', image: 'https://example.com/saw.jpg' },
    { id: '4', name: 'Measuring Tape', price: '$10', image: 'https://example.com/tape.jpg' },
];

const featuredTools = [
    { id: '1', name: 'Angle Grinder', price: '$50', image: 'https://example.com/grinder.jpg' },
    { id: '2', name: 'Cordless Drill', price: '$80', image: 'https://example.com/drill.jpg' },
    { id: '3', name: 'Jigsaw', price: '$100', image: 'https://example.com/jigsaw.jpg' },
    { id: '4', name: 'Impact Driver', price: '$90', image: 'https://example.com/impactdriver.jpg' },
    { id: '5', name: 'Table Saw', price: '$250', image: 'https://example.com/tablesaw.jpg' },
    { id: '6', name: 'Screwdriver Set', price: '$20', image: 'https://example.com/screwdriverset.jpg' },
];

const toolCategories = [
    { id: '1', name: 'Drills' },
    { id: '2', name: 'Saws' },
    { id: '3', name: 'Grinders' },
    { id: '4', name: 'Measuring Tools' },
    { id: '5', name: 'Hand Tools' },
];

const allTools = [
    { id: '1', name: 'Cordless Drill', price: '$80', category: 'Drills', image: 'https://example.com/drill.jpg' },
    { id: '2', name: 'Circular Saw', price: '$120', category: 'Saws', image: 'https://example.com/saw.jpg' },
    { id: '3', name: 'Angle Grinder', price: '$50', category: 'Grinders', image: 'https://example.com/grinder.jpg' },
    { id: '4', name: 'Impact Driver', price: '$90', category: 'Drills', image: 'https://example.com/impactdriver.jpg' },
    { id: '5', name: 'Measuring Tape', price: '$10', category: 'Measuring Tools', image: 'https://example.com/tape.jpg' },
    { id: '6', name: 'Table Saw', price: '$250', category: 'Saws', image: 'https://example.com/tablesaw.jpg' },
    { id: '7', name: 'Jigsaw', price: '$100', category: 'Saws', image: 'https://example.com/jigsaw.jpg' },
    { id: '8', name: 'Hammer', price: '$15', category: 'Hand Tools', image: 'https://example.com/hammer.jpg' },
    { id: '9', name: 'Screwdriver Set', price: '$20', category: 'Hand Tools', image: 'https://example.com/screwdriverset.jpg' },
    { id: '10', name: 'Chisel Set', price: '$30', category: 'Hand Tools', image: 'https://example.com/chiselset.jpg' },
    { id: '11', name: 'Clamp', price: '$25', category: 'Hand Tools', image: 'https://example.com/clamp.jpg' },
    { id: '12', name: 'Workbench', price: '$200', category: 'Measuring Tools', image: 'https://example.com/workbench.jpg' },
];

export default function HomeScreen() {
    const [isSearching, setIsSearching] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Filter the flowers based on selected category
    const filteredFlowers = selectedCategory
        ? allTools.filter(flower => flower.category === selectedCategory)
        : allTools;

    const renderFlowerItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.flowerImage} />
            <View style={styles.cardContent}>
                <Text style={styles.flowerName}>{item.name}</Text>
                <Text style={styles.flowerPrice}>{item.price}</Text>
            </View>
        </View>
    );

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.categoryCard,
                selectedCategory === item.name && styles.selectedCategoryCard
            ]}
            onPress={() => setSelectedCategory(item.name)}
        >
            <Text
                style={[
                    styles.categoryName,
                    selectedCategory === item.name && styles.selectedCategoryText
                ]}
            >
                {item.name}
            </Text>
        </TouchableOpacity>
    );


    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={{ marginTop: 50 ,}}>
                {!isSearching ? (
                    <View style={styles.navbar}>
                        <Text style={styles.title}>Hotjar Shops</Text>
                        <TouchableOpacity onPress={() => setIsSearching(true)}>
                            <Ionicons name="search" size={24} color="#363636" />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TextInput
                        label="Search"
                        mode="outlined"
                        style={styles.inputExpanded}
                        activeOutlineColor="#363636"
                        right={
                            <TextInput.Icon icon="close" onPress={() => setIsSearching(false)} />
                        }
                    />
                )}
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>


                {/* Trending Flowers Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Trending Tools</Text>
                    <FlatList
                        data={trendingTools}
                        renderItem={renderFlowerItem}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                {/* Featured Flowers Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Featured Tools</Text>
                    <FlatList
                        data={featuredTools}
                        renderItem={renderFlowerItem}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                {/* Flower Categories Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Tool Categories</Text>
                    <FlatList
                        data={toolCategories}
                        renderItem={renderCategoryItem}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                {/* Flowers of Selected Category Section */}
                {selectedCategory && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{selectedCategory} Tool</Text>
                        <FlatList
                            data={filteredFlowers}
                            renderItem={renderFlowerItem}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                )}
            </ScrollView>

            {/* Floating Add Button */}
            {/*<TouchableOpacity*/}
            {/*    onPress={() => console.log('Add entry pressed')}*/}
            {/*    style={styles.addButton}*/}
            {/*>*/}
            {/*    <Icon name="add" size={28} color="#fff" />*/}
            {/*</TouchableOpacity>*/}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 20,
    },
    scrollContainer: {

    },
    navbar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 3,
        borderBottomColor: "#8f5009",
        paddingBottom: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: "900",
        color: "#D98324",
    },
    inputExpanded: {
        backgroundColor: "transparent",
        width: "100%",
    },
    section: {
        marginTop: 20,
    },
    sectionTitle: {
        backgroundColor: "#d1d0d0",
        borderRadius: 12,
        padding:8,
        fontSize: 16,
        fontWeight: "bold",
        color: "#363636",
        marginBottom: 10,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        width: 150,
        marginRight: 15,
        elevation: 5,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
    },
    flowerImage: {
        width: "100%",
        height: 100,
        borderRadius: 12,
    },
    cardContent: {
        padding: 10,
    },
    flowerName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#363636",
    },
    flowerPrice: {
        fontSize: 21,
        color: "#ff8800",
    },
    categoryCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 10,
        marginRight: 15,
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    categoryName: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#363636",
    },
    addButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#363636",
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    selectedCategoryCard: {
        backgroundColor: "#D98324", // Pink background when selected
    },
    selectedCategoryText: {
        color: "#fff", // White text when selected
    },

});
