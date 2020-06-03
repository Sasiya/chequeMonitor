<View style={styles.mainContainer2}>
  <View style={styles.mainContainer}>
    <View style={styles.inputText}>
      <Text style={styles.title}>Bill number :</Text>
      <TextInput style={styles.mainInput} />
    </View>
    <View style={styles.inputText}>
      <Text style={styles.title}>Shop name :</Text>
      <TextInput style={styles.mainInput} />
    </View>
    <View style={styles.inputText}>
      <Text style={styles.title}>Bill date :</Text>
      <TextInput style={styles.mainInput} />
    </View>

    <View style={styles.tabView}>
      <Tabs
        onChangeTab={({i}) => this.setState({select: i})}
        tabContainerStyle={styles.tabContainer}
        tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
        tabStyle={{backgroundColor: '#5078F2'}}>
        <Tab
          heading="Cheque"
          tabStyle={{backgroundColor: 'white'}}
          activeTabStyle={{backgroundColor: 'white'}}
          textStyle={{color: 'black'}}
          activeTextStyle={{color: 'black', fontWeight: 'bold'}}>
          <Tab1
            selected={q => {
              this.setState({select: q});
            }}
          />
        </Tab>
        <Tab
          heading="Cash"
          tabStyle={{backgroundColor: 'white'}}
          activeTabStyle={{backgroundColor: 'white'}}
          textStyle={{color: 'black'}}
          activeTextStyle={{color: 'black', fontWeight: 'bold'}}>
          <Tab2
            selected={q => {
              this.setState({select: q});
            }}
          />
        </Tab>
        <Tab
          heading="Pending"
          tabStyle={{backgroundColor: 'white'}}
          activeTabStyle={{backgroundColor: 'white'}}
          textStyle={{color: 'black'}}
          activeTextStyle={{color: 'black', fontWeight: 'bold'}}>
          <Tabs3
            selected={q => {
              this.setState({select: q});
            }}
          />
        </Tab>
      </Tabs>
    </View>
  </View>
</View>;


////////////
<Button
bordered
success
onPress={() => alert('sas')}>
<Text style={styles.buttonTextStyle}>Success</Text>
</Button>

