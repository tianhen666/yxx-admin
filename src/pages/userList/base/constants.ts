/*
 * @Descripttion:
 * @version:
 * @Author: TianHen
 * @Date: 2022-11-01 15:50:02
 * @LastEditors: TianHen
 * @LastEditTime: 2022-11-01 18:35:09
 */
export const COLUMNS = [
  {
    colKey: 'row-select',
    type: 'multiple',
    fixed: 'left',
  },
  {
    title: '用户ID',
    colKey: 'id',
    align: 'center',
    fixed: 'left',
  },
  {
    title: '手机号',
    colKey: 'mobile',
    ellipsis: true,
  },
  {
    title: '用户名',
    ellipsis: true,
    colKey: 'nickname',
  },
  {
    title: '头像',
    ellipsis: true,
    colKey: 'avatar',
  },
  {
    title: '注册时间',
    ellipsis: true,
    colKey: 'create_dt',
  },
  {
    title: '支付金额',
    ellipsis: true,
    colKey: 'price',
  },
  {
    title: '购买数量',
    ellipsis: true,
    colKey: 'productCount',
  },
];
