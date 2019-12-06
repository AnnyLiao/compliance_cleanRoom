<template>
  <div>
    <b-row>
      <b-col>
        <h2 class="page-title">合規轉換檔案狀態</h2>
        <Widget>
          <div class="widget-bottom-overflow">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>File Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>
                    <b-badge variant="primary" class="text-white" pill>In Process</b-badge>
                  </td>
                  <td>
                    <b-dropdown text="Action" variant="outline-dark" class="m-1">
                      <b-dropdown-item href="#">取消</b-dropdown-item>
                    </b-dropdown>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>
                    <b-badge variant="success" class="text-white" pill>Done</b-badge>
                  </td>
                  <td>
                    <b-dropdown text="Action" variant="outline-dark" class="m-1">
                      <b-dropdown-item href="#">合規檢測</b-dropdown-item>
                      <b-dropdown-item href="#">下載</b-dropdown-item>
                      <b-dropdown-item href="#">上傳</b-dropdown-item>
                      <b-dropdown-item href="#">刪除</b-dropdown-item>
                    </b-dropdown>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Larry</td>
                  <td>
                    <b-badge variant="danger" class="text-white" pill>Fail</b-badge>
                  </td>
                  <td>
                    <b-dropdown text="Action" variant="outline-dark" class="m-1">
                      <b-dropdown-item href="#">重新識別</b-dropdown-item>
                      <b-dropdown-item href="#">刪除</b-dropdown-item>
                    </b-dropdown>
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Peter</td>
                  <td>
                    <b-badge variant="success" class="text-white" pill>Done</b-badge>
                  </td>
                  <td>
                    <b-dropdown text="Action" variant="outline-dark" class="m-1">
                      <b-dropdown-item href="#">合規檢測</b-dropdown-item>
                      <b-dropdown-item href="#">下載</b-dropdown-item>
                      <b-dropdown-item href="#">上傳</b-dropdown-item>
                      <b-dropdown-item href="#">刪除</b-dropdown-item>
                    </b-dropdown>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import Vue from "vue";
import Widget from "@/components/Widget/Widget";
export default {
  name: "ConvertManage",
  components: {
    Widget
  }
};
</script>
<style src="./Conversion.scss" lang="scss" />