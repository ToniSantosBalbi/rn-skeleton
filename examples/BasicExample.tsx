import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SkeletonContent, SkeletonLoadingComponent } from 'rn-skeleton';

const BasicExample = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [listLoading, setListLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    const listTimer = setTimeout(() => {
      setListLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(listTimer);
    };
  }, []);

  const cardLayout = [
    {
      key: 'header',
      width: '100%',
      height: 50,
      flexDirection: 'row' as const,
      marginBottom: 15,
      children: [
        { key: 'avatar', width: 50, height: 50, borderRadius: 25, marginRight: 15 },
        {
          key: 'userInfo',
          width: 200,
          height: 50,
          flexDirection: 'column' as const,
          justifyContent: 'space-between' as const,
          children: [
            { key: 'name', width: 150, height: 16 },
            { key: 'time', width: 100, height: 12 },
          ],
        },
      ],
    },
    { key: 'content', width: '100%', height: 150, marginBottom: 15, borderRadius: 8 },
    {
      key: 'actions',
      width: '100%',
      height: 40,
      flexDirection: 'row' as const,
      justifyContent: 'space-between' as const,
      children: [
        { key: 'like', width: 80, height: 35, borderRadius: 4 },
        { key: 'comment', width: 80, height: 35, borderRadius: 4 },
        { key: 'share', width: 80, height: 35, borderRadius: 4 },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Skeleton Loading Examples</Text>

      {/* Card Example */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Card Example</Text>
        <View style={styles.card}>
          <SkeletonContent
            isLoading={isLoading}
            layout={cardLayout}
            animationType="shiver"
            animationDirection="horizontalRight"
          >
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <View style={styles.avatar} />
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>John Doe</Text>
                  <Text style={styles.userTime}>2 hours ago</Text>
                </View>
              </View>
              <Text style={styles.cardText}>
                This is the actual content that appears after loading is complete.
                The skeleton mimics the layout structure.
              </Text>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text>Like</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Text>Comment</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Text>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SkeletonContent>
        </View>
      </View>

      {/* List Example */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>List Example</Text>
        {listLoading ? (
          <SkeletonLoadingComponent
            quantity={4}
            width="100%"
            height={60}
            marginBetween={10}
            paddingHorizontal={0}
            paddingVertical={0}
          />
        ) : (
          <View>
            {[1, 2, 3, 4].map((item) => (
              <View key={item} style={styles.listItem}>
                <Text>List Item {item}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Reload Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.reloadButton}
          onPress={() => {
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 3000);
          }}
        >
          <Text style={styles.buttonText}>Reload Card</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.reloadButton}
          onPress={() => {
            setListLoading(true);
            setTimeout(() => setListLoading(false), 2000);
          }}
        >
          <Text style={styles.buttonText}>Reload List</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    // Actual content styles
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd',
    marginRight: 15,
  },
  userInfo: {
    justifyContent: 'space-between',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  userTime: {
    fontSize: 12,
    color: '#666',
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 15,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  listItem: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  reloadButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default BasicExample; 