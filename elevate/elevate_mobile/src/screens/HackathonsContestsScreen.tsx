import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from '../components/Card';
import { getContests, getHackathons, Event } from '../data/eventsData';
import { useEffect, useState } from 'react';

interface Section {
  title: string;
  items: Event[];
}

export default function HackathonsContestsScreen() {
  const [sections, setSections] = useState<Section[]>([
    { title: 'Contests', items: [] },
    { title: 'Hackathons', items: [] }
  ]);

  useEffect(() => {
    const contests = getContests();
    const hackathons = getHackathons();
    setSections([
      { title: 'Contests', items: contests },
      { title: 'Hackathons', items: hackathons }
    ]);
  }, []);

  return (
    <ScrollView style={styles.container}>
      {sections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.items.map((item, itemIndex) => (
            <Card key={itemIndex} style={styles.card}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDate}>{item.date}</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>{item.status}</Text>
              </TouchableOpacity>
            </Card>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  itemDate: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
});