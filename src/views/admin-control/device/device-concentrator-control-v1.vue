<template>
    <Table style="margin: 10px" :columns="UserColumn" :data="UserData">
    </Table>
    <Page :total="PageTotal" show-sizer show-total @on-change="pageChange" @on-page-size-change="sizeChange"
          style="margin:10px;text-align:center;align:right"></Page>
</template>