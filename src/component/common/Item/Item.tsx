import React, { ReactNode } from 'react';
import { StyleSheet, ViewStyle, ViewProps } from 'react-native';
import Layout from '../Layout/Layout';

interface Props extends ViewProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  more?: ReactNode;
  outlined?: boolean;
}

const Item: React.FC<Props> = (props) => {
  const { title, subtitle, more, outlined, style, ...other } = props;

  const outlinedStyle: ViewStyle = outlined
    ? {
        borderColor: 'white',
        borderWidth: 1
      }
    : {};

  return (
    <Layout fullWidth style={[styles.root, outlinedStyle, style]} {...other}>
      <Layout direction="row" style={[styles.container]}>
        {(title || subtitle) && (
          <Layout align="flex-start" style={{ flex: 3 }}>
            <Layout direction="row" style={styles.titleMoreWrapper}>
              <Layout align="flex-start" style={styles.title}>
                {title}
              </Layout>
              {more && (
                <Layout align="flex-end" style={styles.more}>
                  {more}
                </Layout>
              )}
            </Layout>
            {subtitle}
          </Layout>
        )}
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  root: {
    borderRadius: 13,
    height: 80
  },
  container: {
    paddingTop: 10,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20
  },
  titleMoreWrapper: {
    marginBottom: 3
  },
  title: {
    flex: 3
  },
  more: {
    flex: 1.5
  }
});

export default Item;
