import { View, Text, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguageStore } from '../../store/languageStore';

export default function HomeScreen() {
  const { t, language, setLanguage } = useLanguageStore();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'np' : 'en');
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Header Section */}
      <View className="bg-blue-600 p-6">
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-2xl font-bold">{t('overview.title')}</Text>
          <Pressable 
            onPress={toggleLanguage}
            className="bg-blue-500 px-3 py-1 rounded-full"
          >
            <Text className="text-white font-medium">
              {language.toUpperCase()}
            </Text>
          </Pressable>
        </View>
        <View className="flex-row justify-between mt-4">
          <View>
            <Text className="text-white text-sm">{t('overview.income')}</Text>
            <Text className="text-white text-xl font-bold">$2,500.00</Text>
          </View>
          <View>
            <Text className="text-white text-sm">{t('overview.expenses')}</Text>
            <Text className="text-white text-xl font-bold">$1,200.00</Text>
          </View>
        </View>
      </View>

      {/* Quick Add Transaction Button */}
      <Pressable className="bg-white mx-4 -mt-6 p-4 rounded-xl shadow-md flex-row items-center justify-center">
        <Ionicons name="add-circle" size={24} color="#2563eb" />
        <Text className="ml-2 text-blue-600 font-semibold">{t('actions.addTransaction')}</Text>
      </Pressable>

      {/* Daily Transactions */}
      <View className="bg-white m-4 p-4 rounded-xl">
        <Text className="text-lg font-semibold mb-4">{t('transactions.todayTitle')}</Text>
        <View className="border-b border-gray-200 pb-2 mb-2">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <View className="bg-blue-100 p-2 rounded-full">
                <Ionicons name="cart" size={20} color="#2563eb" />
              </View>
              <View className="ml-3">
                <Text className="font-medium">{t('transactions.groceryShopping')}</Text>
                <Text className="text-gray-500 text-sm">2:30 PM</Text>
              </View>
            </View>
            <Text className="text-red-500 font-medium">-$45.00</Text>
          </View>
        </View>
      </View>

      {/* Calendar Overview */}
      <View className="bg-white m-4 p-4 rounded-xl">
        <Text className="text-lg font-semibold mb-4">{t('calendar.title')}</Text>
        <View className="h-[200px] items-center justify-center">
          <Text className="text-gray-500">{t('calendar.comingSoon')}</Text>
        </View>
      </View>

      {/* Monthly Overview */}
      <View className="bg-white m-4 p-4 rounded-xl">
        <Text className="text-lg font-semibold mb-4">{t('monthlyOverview.title')}</Text>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-500">{t('monthlyOverview.income')}</Text>
          <Text className="text-green-500 font-medium">$5,200.00</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-500">{t('monthlyOverview.expenses')}</Text>
          <Text className="text-red-500 font-medium">$3,800.00</Text>
        </View>
        <View className="h-4 bg-gray-200 rounded-full mt-2">
          <View className="h-4 bg-blue-600 rounded-full w-3/4" />
        </View>
      </View>
    </ScrollView>
  );
}