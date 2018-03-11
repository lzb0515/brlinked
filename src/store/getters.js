
var getters={
  channelsPath: state => {
    var defaultPath = state.channels.default.map((channel) => {
		      return channel="/news/"+channel.path;
		    });
    return defaultPath;
  },
  channelsPage: state => {
    var defaultPage = state.channels.default.map((channel) => {
		      return channel.page;
		    });
    return defaultPage;
  }
}

export default getters;