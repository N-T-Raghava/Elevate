import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Card } from '../components/Card';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ChatSession {
  id: string;
  title: string;
  timestamp: Date;
}

interface ChatMessage {
  type: 'user' | 'bot';
  text: string;
}

export default function ChatbotScreen() {
  const [message, setMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { type: 'bot', text: 'Hello! How can I help you today?' }
  ]);
  const [sessions, setSessions] = useState<ChatSession[]>([
    { id: '1', title: 'Previous Chat 1', timestamp: new Date('2025-10-18') },
    { id: '2', title: 'Previous Chat 2', timestamp: new Date('2025-10-17') },
  ]);

  const sendMessage = () => {
    if (message.trim() === '') return;

    // Add user message
    setChatHistory(prev => [...prev, { type: 'user', text: message }]);

    // Simulate bot response (in a real app, this would call your API)
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        type: 'bot', 
        text: 'This is a simulated response. In the actual app, this would be integrated with your chatbot backend.'
      }]);
    }, 1000);

    setMessage('');
  };

  const loadChatSession = (sessionId: string) => {
    // TODO: Implement loading previous chat sessions
    console.log('Loading chat session:', sessionId);
  };

  return (
    <View style={styles.container}>
      {/* Sidebar Toggle Button */}
      <TouchableOpacity 
        style={styles.toggleButton}
        onPress={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Icon 
          name={isSidebarOpen ? "menu-open" : "menu"} 
          size={24} 
          color="#ffffff" 
        />
      </TouchableOpacity>

      {/* Animated Sidebar */}
      {isSidebarOpen && (
        <View style={styles.sidebar}>
          <View style={styles.sidebarHeader}>
            <Text style={styles.sidebarTitle}>Chat History</Text>
          </View>
          <ScrollView style={styles.historyList}>
            {sessions.map((session) => (
              <TouchableOpacity 
                key={session.id} 
                style={styles.historyItem}
                onPress={() => loadChatSession(session.id)}
              >
                <Text style={styles.historyTitle}>{session.title}</Text>
                <Text style={styles.historyDate}>
                  {session.timestamp.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
        
      {/* Main Chat Area */}
      <View style={[
        styles.mainContent,
        isSidebarOpen && styles.mainContentShifted
      ]}>
        <ScrollView 
          style={styles.chatContainer}
          contentContainerStyle={styles.chatContentContainer}
        >
          {chatHistory.map((chat, index) => (
            <View 
              key={index} 
              style={[
                styles.messageContainer,
                chat.type === 'user' ? styles.userMessage : styles.botMessage
              ]}
            >
              <Card style={styles.messageCard}>
                <Text style={styles.messageText}>{chat.text}</Text>
              </Card>
            </View>
          ))}
        </ScrollView>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type your message..."
            placeholderTextColor="#666666"
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  toggleButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 2,
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 280,
    backgroundColor: '#1a1a1a',
    borderRightWidth: 1,
    borderRightColor: '#2a2a2a',
    zIndex: 1,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sidebarHeader: {
    paddingTop: 40,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    paddingHorizontal: 16,
  },
  historyList: {
    flex: 1,
  },
  historyItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  historyTitle: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 4,
  },
  historyDate: {
    fontSize: 12,
    color: '#666666',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 50, // Space for the toggle button
  },
  mainContentShifted: {
    marginLeft: 280, // Width of the sidebar
  },
  chatContentContainer: {
    padding: 16,
    paddingTop: 60, // Space for toggle button
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    marginBottom: 12,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  botMessage: {
    alignItems: 'flex-start',
  },
  messageCard: {
    maxWidth: '80%',
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  messageText: {
    color: '#ffffff',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
  },
  input: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    color: '#ffffff',
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});