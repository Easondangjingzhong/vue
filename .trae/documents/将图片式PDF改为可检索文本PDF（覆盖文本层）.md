## 目标
- 仅对匹配给定“关键词”的表单字段进行文本层覆盖，其他内容仍为图片背景。

## 实现思路
- 保留当前 `html2canvas` + 分页图片背景；在每页上，仅对命中关键词的字段位置使用 `jsPDF.text` 叠加文字。
- 关键词来源：组件 `props`（如 `pdfTextWhitelist: string[]`）或模块常量；由业务传入、可配置。

## 关键词匹配规则
- 获取每个输入字段的“字段名”，并与关键词数组做包含匹配：
  - 优先 `data-key`（若存在）、`aria-label`、`name`。
  - 通过 `label[for=id]` 获取关联标签文本。
  - 常见表单结构：在最近的 `.form-item` 容器中查询标签元素（如 `.el-form-item__label` / `.form-item__label`）。
- 命中任何关键词则视为需要文本覆盖。

## 主要步骤
1. 新增 `collectTextNodes(element, whitelist)`：返回仅命中关键词的 `{ text, xPx, yPx, widthPx }[]`。
2. 保留现有分页切片逻辑；在 `addImage` 后对当前页范围文本：
   - 坐标换算：`x_mm = margin + x_px * mmPerPx`，`y_mm = margin + (y_px - currY) * mmPerPx`。
   - 使用 `pdf.text(...)` 绘制，必要时 `wrapText` 控制行宽。
3. 中文字体：在导出前加载 `NotoSansSC-Regular.ttf`，`addFileToVFS` + `addFont` + `setFont`，确保中文可选中与显示正常。
4. 可扩展：支持把关键词写到 DOM 上（`data-key="身份证号"` 等）增强精准度。

## 接口与配置
- 组件新增可选 `props`: `pdfTextWhitelist: string[]`；
- 默认示例：`['姓名','身份证号','手机号','邮箱','紧急联系人','地址']`。

## 验证
- 导出的 PDF 中只有被关键词命中的字段文本可选择/搜索；
- 非命中字段保持图片背景效果；
- 中文显示、搜索正常；多页文本不截断。

## 备注
- 若表单使用不同 UI 库，标签选择器需按实际类名适配（我们将在实现时针对当前页面结构调试并确认）。