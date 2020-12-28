import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import { connect } from 'react-redux';
import { Layout, Text } from 'component/common';
import {
  getListBranches,
  ListBranchesRes,
  IBranches
} from 'redux/action/branch.action';
import ContainerView from 'component/layout/ContainerView';
import StackHeader from 'component/layout/Header/StackHeader';
import { Color } from 'theme/color';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  getListBranches: () => Promise<ListBranchesRes>;
}

export interface IBranchesDics {
  [province: string]: IBranches[];
}

const SystemAddress: React.FC<Props> = (props: Props) => {
  // const { getListBranches } = props;
  const [listBranchesDics, setListBranchesDics] = useState<IBranchesDics>({});

  useEffect(() => {
    (async () => {
      const resultBranches = await props.getListBranches();
      const branchesDics: any = {};
      resultBranches.map((branch) => {
        if (!branchesDics[branch.province]) {
          branchesDics[branch.province] = [branch];
        } else {
          branchesDics[branch.province] = [
            ...branchesDics[branch.province],
            branch
          ];
        }
      });
      setListBranchesDics(branchesDics);
    })();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.white.light }}>
      <Layout color="white" fullSize style={{ justifyContent: 'flex-start' }}>
        <StatusBar barStyle="light-content" />
        <StackHeader
          title="Danh sách địa chỉ hệ thống"
          color="green"
          titleColor="white"
          iconColor="white"
        />
        <ContainerView>
          <Layout
            style={{
              alignItems: 'flex-start',
              marginTop: 60
            }}
          >
            {Object.keys(listBranchesDics).map((province) => (
              <View style={styles.groupBranch}>
                <View style={{ marginBottom: 26 }}>
                  <Text style={styles.titleBold} color="blackLight">
                    {province}
                  </Text>
                </View>
                {listBranchesDics[province].map((branch: any) => (
                  <View style={{ marginBottom: 20 }}>
                    <Text style={styles.branchName} color="blackLight">
                      {branch.name}
                    </Text>
                    <Text style={styles.address} color="blackLight">
                      {branch.address}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </Layout>
        </ContainerView>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    backgroundColor: 'white',
    marginBottom: 10
  },
  groupBranch: {
    marginBottom: 70
  },
  titleBold: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  branchName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6
  },
  address: {
    fontSize: 16
  }
});

const mapStateToProps = () => ({});
const mapDispatchToProps = { getListBranches };

export default connect(mapStateToProps, mapDispatchToProps)(SystemAddress);
