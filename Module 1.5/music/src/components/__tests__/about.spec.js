import AboutView from "@/views/AboutView.vue";
import { mount } from "@vue/test-utils";

describe("About.vue", () => {
  test("renders inner text", () => {
    const wrapper = mount(AboutView);

    expect(wrapper.text()).toContain("about");
  });
});
