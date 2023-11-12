import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, FillLayer, MapView, PointAnnotation, ShapeSource } from '@rnmapbox/maps';
import { Feature, GeoJsonProperties, Geometry, Point, Polygon } from 'geojson';
import { Position } from '@rnmapbox/maps/lib/typescript/types/Position';
import { useAppSelector } from '../../hooks/useAppDispatch';
import { useTranslation } from 'react-i18next';
import uuid from 'react-native-uuid';

// THEME
import Colors from '../../constants/Colors';

// ICONS
import DragSvg from '../../assets/svg/icons/DragSvg';
import RemoveSvg from '../../assets/svg/icons/RemoveIcon';

// COMPONENTS
import ScreenTopBar from '../../components/ScreenTopBar';
import PointsControl from '../../components/map/PointsControl';
import Typography, { TypographyType } from '../../components/controls/Typography';
import Button from '../../components/controls/Button';
import IconButton from '../../components/controls/IconButton';
import MapPoints from '../../components/map/MapPoints';

const POINT_COLORS = ['#3d459c', '#803d9c', '#9e1c68', '#c91f16', '#c9461e', '#d6af2f'];

type SelectedPoint = {
  id: string;
  isDraggableMode: boolean;
  isRemoveMode: boolean;
  coordinates: Position;
  color: string;
};

const SelectAreaScreen = () => {
  const { t } = useTranslation();
  const { userPlaces } = useAppSelector((state) => state.map);
  const [features, setFeatures] = useState<SelectedPoint[]>([]);
  const [draggableMode, setDraggableMode] = useState(false);
  const [removeMode, setRemoveMode] = useState(false);

  const removePoint = (feature: SelectedPoint) => {
    const newFeatures = features.filter((f) => f.id !== feature.id);
    if (newFeatures.length === 0) {
      setRemoveMode(false);
    }
    setFeatures(newFeatures);
  };

  const buildPolygon = (features: SelectedPoint[]) => {
    const coordinates: Position[][] = [features.map((f) => f.coordinates)];

    const polygon: Feature<Polygon> = {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: coordinates,
      },
      properties: null,
    };

    return (
      <ShapeSource id="source" key={'source'} shape={polygon}>
        <FillLayer id="fill" style={{ fillColor: Colors.backgroundTransparent, fillOpacity: 0.7 }} />
      </ShapeSource>
    );
  };

  const addFeature = (feature: Feature<Geometry>) => {
    const featuresColor = features.map((f) => f.color);
    const uniqueColor = POINT_COLORS.find((c) => !featuresColor.includes(c)) as string;

    const _feature: SelectedPoint = {
      id: uuid.v4() as string,
      isRemoveMode: false,
      isDraggableMode: false,
      coordinates: (feature as Feature<Point>).geometry.coordinates,
      color: uniqueColor,
    };
    setFeatures((prev) => [...prev, _feature]);
  };

  const searchPlaces = () => {
    console.log('Search Places');
  };

  useEffect(() => {
    const newFeatures = features.map((f) => {
      return {
        ...f,
        isDraggableMode: draggableMode,
      };
    });
    setFeatures(newFeatures);
  }, [draggableMode]);

  useEffect(() => {
    const newFeatures = features.map((f) => {
      return {
        ...f,
        isRemoveMode: removeMode,
      };
    });
    setFeatures(newFeatures);
  }, [removeMode]);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScreenTopBar
        rightIcon={
          <TouchableOpacity onPress={() => setFeatures([])}>
            <Typography type={TypographyType.SmallHeaderR} color={Colors.white}>
              {t('selectArea:resetButton')}
            </Typography>
          </TouchableOpacity>
        }
      />
      <View style={styles.mapContainer}>
        <MapView
          scaleBarEnabled={false}
          style={styles.map}
          onPress={(_feature: Feature<Geometry, GeoJsonProperties>) => {
            if (features.length < 6) {
              addFeature(_feature);
            }
          }}
        >
          <Camera defaultSettings={{ centerCoordinate: [22.5673331, 51.249687], zoomLevel: 14 }} />
          <MapPoints data={userPlaces.data} />
          {features.length >= 4 ? buildPolygon(features) : null}
          {features.map((f, i) => {
            return (
              <PointAnnotation
                id={f.id}
                key={f.id}
                coordinate={f.coordinates}
                draggable={f.isDraggableMode}
                onDragEnd={(feature) => {
                  const coords = feature.geometry.coordinates;
                  const newFeatures = features.map((f) => {
                    if (f.id === feature.id) {
                      return {
                        ...f,
                        coordinates: coords,
                      };
                    }
                    return f;
                  });
                  setFeatures(newFeatures);
                }}
              >
                <View style={[styles.point, { backgroundColor: f.color }]} />
              </PointAnnotation>
            );
          })}
        </MapView>
      </View>
      <View style={styles.panel}>
        <PointsControl features={features} removePoint={removePoint} />
        <View style={styles.panelButtons}>
          <View style={styles.searchButton}>
            <Button title={t('selectArea:searchButton')} onPress={searchPlaces} disabled={features.length < 4} />
          </View>
          <IconButton
            onPress={() => setDraggableMode(!draggableMode)}
            size={56}
            disabled={features.length === 0}
            active={draggableMode}
            icon={<DragSvg fill={draggableMode ? Colors.white : Colors.primary} />}
          />
          <IconButton
            onPress={() => setRemoveMode(!removeMode)}
            size={56}
            disabled={features.length === 0}
            active={removeMode}
            icon={<RemoveSvg stroke={removeMode ? Colors.white : Colors.primary} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SelectAreaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  panel: {
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  panelButtons: {
    flexDirection: 'row',
    gap: 20,
  },
  point: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.black,
    borderWidth: 1,
  },
  searchButton: {
    flex: 1,
  },
  iconButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  icon: {
    width: 20,
    height: 20,
  },
  active: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    opacity: 0.6,
  },
});
