import React, { FC } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../hooks/useAppDispatch';
import { PlaceCategory } from '../../store/types/Categories';

// THEME
import Colors from '../../constants/Colors';

// COMPONENTS
import Typography from '../controls/Typography';

interface Props {
  activeCategoryID: number | null;
  changeCategory: (id: number | null) => void;
}

const FilterTab: FC<Props> = ({ activeCategoryID, changeCategory }) => {
  const { i18n } = useTranslation();
  const { userPlaces, categories } = useAppSelector((state) => state.map);

  const availableCategoriesID = Array.from(new Set(userPlaces.data.map((place) => place.attributes.category.data.id)));
  let filteredCategories = categories.data.filter((category) => availableCategoriesID.includes(category.id));

  if (i18n.language === 'pl') {
    filteredCategories = filteredCategories.map((item) => {
      const localizations = item.attributes.localizations.data.find((loc) => loc.attributes.locale === 'pl');

      return {
        ...item,
        attributes: {
          ...item.attributes,
          name: localizations?.attributes.name || item.attributes.name,
        },
      } as PlaceCategory;
    });
  }

  return (
    <View>
      <FlatList
        data={filteredCategories}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              if (activeCategoryID !== item.id || activeCategoryID === null) {
                changeCategory(item.id);
              } else {
                changeCategory(null);
              }
            }}
            style={[styles.categoryItem, item.id === activeCategoryID && styles.activeCategory]}
          >
            <Typography style={item.id === activeCategoryID && styles.activeCategoryText}>
              {item.attributes.name}
            </Typography>
            <View style={styles.categoryIcon}>
              <SvgXml xml={item.attributes.icon} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default FilterTab;

const styles = StyleSheet.create({
  container: {
    height: 50,
    gap: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: Colors.white,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 20,
  },
  categoryIcon: {
    width: 25,
    height: 25,
  },
  activeCategory: {
    backgroundColor: Colors.primary,
  },
  activeCategoryText: {
    color: Colors.white,
  },
});
