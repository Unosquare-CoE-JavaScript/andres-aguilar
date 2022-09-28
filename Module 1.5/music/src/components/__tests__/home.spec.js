import { shallowMount } from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue";
import SongItem from "@/components/SongItem.vue";

describe("HomeView.vue", () => {
  test("renders list of songs", () => {
    const songs = [{}, {}, {}];
    const component = shallowMount(HomeView, {
      data() {
        return {
          songs,
        };
      },
    });

    const items = component.findAllComponents(SongItem);

    expect(items).toHaveLength(songs.length);
  });
});
