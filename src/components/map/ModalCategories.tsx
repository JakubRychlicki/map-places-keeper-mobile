import { FC } from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';
import { SvgXml } from 'react-native-svg';
import { PlaceCategory } from '../../store/types/Categories';
import { useAppSelector } from '../../hooks/useAppDispatch';

// THEME
import Colors from '../../constants/Colors';

// ASSETS
import CloseSvg from '../../assets/svg/icons/CloseSvg';

// CONPONENTS
import Typography, { TypographyType } from '../controls/Typography';
import Loader from '../controls/Loader';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

const SIZE = (widthScreen - 100) / 3;

interface Props {
  visible: boolean;
  hideModal: () => void;
  activeCategoryId: number;
  changeCategory: (category: PlaceCategory) => void;
}

const ModalCategories: FC<Props> = ({ visible, hideModal, activeCategoryId, changeCategory }) => {
  const { t, i18n } = useTranslation();
  const { categories } = useAppSelector((state) => state.map);

  let filteredCategories = categories.data;

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
    <Modal
      isVisible={visible}
      onBackdropPress={hideModal}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      useNativeDriverForBackdrop={true}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Typography type={TypographyType.TextM} style={styles.title}>
            {t('modals:categories:title')}
          </Typography>
          <TouchableOpacity activeOpacity={0.6} style={styles.closeButton} onPress={hideModal}>
            <View style={styles.closeButtonIcon}>
              <CloseSvg stroke={Colors.black} />
            </View>
          </TouchableOpacity>
        </View>

        {filteredCategories.length > 0 ? (
          <FlatList
            data={filteredCategories}
            numColumns={3}
            columnWrapperStyle={styles.categoryListColumnWrapper}
            contentContainerStyle={styles.categoryListContentContainer}
            renderItem={({ item }) => {
              const { name, icon } = item.attributes;
              return (
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={[styles.category, item.id === activeCategoryId && styles.activeCategory]}
                  onPress={() => {
                    changeCategory(item);
                    hideModal();
                  }}
                >
                  <View style={styles.categoryIcon}>
                    <SvgXml xml={icon} />
                  </View>
                  <Typography numberOfLines={1}>{name}</Typography>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <Loader />
        )}
      </View>
    </Modal>
  );
};

export default ModalCategories;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    width: widthScreen * 0.9,
    height: heightScreen * 0.9,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    borderRadius: 20,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  title: {
    paddingVertical: 7,
  },
  categoryListContentContainer: {
    paddingBottom: 20,
  },
  categoryListColumnWrapper: {
    columnGap: 10,
  },
  category: {
    flex: 1,
    width: SIZE,
    maxWidth: SIZE,
    backgroundColor: Colors.lightGray,
    padding: 10,
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 15,
  },
  categoryIcon: {
    height: 40,
    marginBottom: 15,
  },
  activeCategory: {
    backgroundColor: Colors.lightBlue,
    borderColor: Colors.primary,
  },
  closeButton: {
    padding: 5,
  },
  closeButtonIcon: {
    width: 22,
    height: 22,
    backgroundColor: Colors.lightGray,
  },
});
