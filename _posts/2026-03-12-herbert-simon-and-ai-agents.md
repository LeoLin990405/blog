---
layout: post
title: "有限理性的机器——赫伯特·西蒙的理论体系对 AI Agent 设计的深层启示"
title_en: "Machines of Bounded Rationality — Herbert Simon's Theoretical Legacy for AI Agent Design"
date: 2026-03-12
tags: [AI, Agent, Herbert Simon, Bounded Rationality, Cognitive Science, Multi-Agent]
categories: [essay, reading]
bilingual: true
---

<div class="lang-zh" markdown="1">

> *"The capacity of the human mind for formulating and solving complex problems is very small compared with the size of the problems whose solution is required for objectively rational behavior in the real world — or even for a reasonable approximation to such objective rationality."*
> *—— Herbert A. Simon, Administrative Behavior, 4th ed. (1997), p. xxix*

---

2024 年以来，AI Agent 已成为大语言模型应用的核心范式。然而，这场以「智能体」为名的技术浪潮之下，隐藏着一个令人不安的知识史问题：当工程师们为「上下文窗口的有限性」、「何时停止搜索」、「多 Agent 的协调开销」等难题绞尽脑汁时，他们正在以全新的语言，重新发明赫伯特·西蒙半个世纪前已经系统性解决的问题——满意化搜索、注意力经济学、近似可分解性。这种集体性失忆代价高昂：它使当前 Agent 研究在已开垦的土地上反复耕作，却对真正的荒野视而不见。

赫伯特·亚历山大·西蒙（Herbert Alexander Simon, 1916–2001）是 20 世纪罕见的跨学科巨匠：1978 年诺贝尔经济学奖得主，1975 年图灵奖得主，同时在政治学、心理学、管理学、人工智能和认知科学领域做出了奠基性贡献。他的核心思想——**有限理性（bounded rationality）**——不仅重塑了经济学和组织理论，更直接催生了现代 AI 的多个核心概念。

但更深层的讽刺在于：西蒙不仅解决了这些问题，他还明确标注了他**未能**解决的问题。在他关于有限理性的框架中，有若干核心难题被他自己称为「尚未完结的议程」——决策前提如何在多层级组织中保持一致而不失真、满意化标准本身如何随经验自适应演化、复杂人工物如何在内外部环境同时变化时维持适应性。这些被西蒙搁置的问题，恰恰是今日 Agent 架构最脆弱的接缝所在：长任务中目标漂移、跨会话记忆的一致性崩溃、多 Agent 系统中协调成本随规模指数上升。

本文的论点因此是双重的。**第一**，当前 Agent 研究的许多「创新」，在西蒙的理论地图上不过是已知坐标的重新发现——理解这一点，能帮助我们以更低的成本复现他六十年研究的精华。**第二**，也是更重要的：西蒙明确标注为「未解决」的那些深层挑战，才是通向下一代 Agent 架构的真正路标。重新发明西蒙已解决的问题是浪费；忽视他留下的未解问题，则是一种更深的智识损失。

以下八个章节，将依次展开这幅被遮蔽的知识地图——前七章梳理已知领地，第八章进入西蒙框架自身的边界地带。

---

## 一、有限理性：Agent 设计的第一性原理

### 1.1 从「经济人」到「管理人」

西蒙对经济学的核心贡献是对新古典经济学「完全理性经济人」假设的系统性批判。在他 1947 年的博士论文《管理行为》（*Administrative Behavior*）中，西蒙指出：现实中的决策者面临三重根本性约束<sup>[1]</sup>：

1. **信息约束**：决策者不可能获取所有相关信息。
2. **计算约束**：即使获取了信息，决策者也没有足够的计算能力处理所有信息。
3. **注意力约束**：人类的注意力是稀缺资源，无法同时关注所有维度。

因此，决策者不是**最大化效用（maximizing）**，而是**满意化（satisficing）**——寻找一个满足最低可接受标准的方案，然后停止搜索。

### 1.2 LLM Agent 是「有限理性」的完美实例

这个理论框架与当代 LLM Agent 的对应关系几乎是惊人的精确：

| 西蒙的有限理性约束 | LLM Agent 的对应约束 | 具体表现 |
|---|---|---|
| 信息约束 | **上下文窗口（context window）有限** | Claude 200K tokens、GPT-4 128K tokens，超出即「遗忘」 |
| 计算约束 | **单次推理的计算预算有限** | 推理时间、token 生成速率、链式推理深度受限 |
| 注意力约束 | **注意力机制的实际有效范围有限** | Lost-in-the-middle 问题<sup>[2]</sup>，长上下文中间部分被忽略 |

Liu 等人（2024）在「Lost in the Middle」研究中实验性地证明了 LLM 的注意力分布呈 U 型曲线：模型对上下文开头和结尾的信息敏感度显著高于中间部分<sup>[2]</sup>。这与认知心理学中的**首因效应（primacy effect）**和**近因效应（recency effect）**高度一致——而这恰恰是西蒙在 1950 年代研究人类信息处理时就已经描述的现象。

### 1.3 对 Agent 设计的启示：拥抱有限性

西蒙理论的核心启示不是「如何克服有限性」，而是**「如何在有限性约束下做出足够好的决策」**。这对 Agent 设计意味着：

**（a）放弃全局最优的幻觉。** 很多 Agent 框架试图通过「思维链」（Chain-of-Thought）或「思维树」（Tree-of-Thought）来逼近最优推理路径。西蒙会指出：在搜索空间指数增长的条件下，穷举式搜索本身就是反理性的。真正理性的做法是使用**启发式（heuristics）**来剪枝。

**（b）设计显式的停止规则。** 满意化理论的核心是**何时停止搜索**。当前多数 Agent 框架缺乏清晰的停止准则——要么在达到 token 上限时被动终止，要么依赖模型自身的「判断」。西蒙的理论建议：Agent 应当有**显式的 aspiration level（期望水平）**，当找到满足该水平的方案时即停止。

**（c）上下文管理即注意力管理。** 西蒙在其 1971 年的著名论断中说：「信息丰富的世界中，信息的丰富意味着其他东西的匮乏——即信息所消耗的注意力的匮乏。」<sup>[3]</sup> 对 Agent 而言，context window 就是注意力。因此，**上下文管理（context management）策略——什么信息放入上下文、什么信息摘要、什么信息丢弃——是 Agent 架构中最核心的设计决策之一**，而非一个工程细节。

这个对应关系并非巧合，而是一种令人不安的重演。当工程师们在争论 RAG 与全上下文、摘要压缩与丢弃策略时，他们其实是在用 GPU 算力重新推导西蒙 1955 年在《行为模型》中已经形式化的注意力分配问题——只是没有意识到这一点。有限理性的核心洞见是：认知瓶颈不是缺陷，而是架构约束，必须被设计，而非被克服。Agent 研究至今仍在这个象限里高效劳作，却鲜少追问：西蒙自己认为有限理性理论**无法解释**什么？那才是值得警觉的地方。

---

## 二、满意化搜索与 Agent 的规划策略

### 2.1 搜索作为决策的基本机制

西蒙与纽厄尔（Allen Newell）在 1950–70 年代的合作中，将问题求解形式化为**在问题空间（problem space）中的搜索**<sup>[4]</sup>。他们的核心框架是：

- **初始状态（initial state）**：问题的当前描述
- **目标状态（goal state）**：期望达到的结果
- **算子（operators）**：可用的操作或变换
- **搜索策略（search strategy）**：选择和应用算子的方法

这个框架直接映射到当代 Agent 的 ReAct（Reasoning + Acting）范式<sup>[5]</sup>：

| 问题空间概念 | Agent 对应概念 |
|---|---|
| 初始状态 | 用户 prompt + 当前环境状态 |
| 目标状态 | 任务完成条件 |
| 算子 | 可用工具（tools）/ 函数调用 |
| 搜索策略 | LLM 的推理 + 工具选择逻辑 |

### 2.2 手段-目的分析（Means-Ends Analysis）

西蒙和纽厄尔提出的**手段-目的分析（MEA）**是其最具影响力的问题求解策略<sup>[4]</sup>。MEA 的核心逻辑是：

1. 比较当前状态与目标状态，识别**差异（difference）**。
2. 搜索能**缩小该差异**的算子。
3. 如果该算子的前置条件不满足，则**递归地**将满足前置条件设为子目标。

这与当代 Agent 的**分层规划（hierarchical planning）**和**子目标分解（subgoal decomposition）**本质上是同一种思路。例如，当 Claude Code 接收到「重构这个模块」的指令时，它的隐式推理过程是：

```
目标：重构模块 X
当前状态：模块 X 包含函数 A, B, C，存在代码重复
差异：代码重复、耦合度高
可用算子：Read（读取文件）、Edit（编辑文件）、Grep（搜索模式）、Bash（运行测试）
子目标 1：理解当前代码结构（算子：Read, Grep）
子目标 2：识别重复模式（算子：Grep）
子目标 3：提取公共逻辑（算子：Edit）
子目标 4：验证重构正确性（算子：Bash → 运行测试）
```

### 2.3 启发式搜索与「足够好」的工具选择

西蒙反复强调：在复杂问题中，穷举搜索是不可行的，**启发式（heuristics）是理性行为的必要条件**<sup>[6]</sup>。

这对 Agent 的工具选择（tool selection）有直接启示。当前 Agent 面临的一个核心问题是：当可用工具数量增多时，工具选择的准确率下降。这本质上是一个搜索空间爆炸问题。西蒙的理论建议采用以下策略：

1. **识别-然后行动（Recognition-then-act）**：西蒙在研究国际象棋大师时发现，专家不是通过深度搜索来下棋，而是通过**模式识别（pattern recognition）**——识别棋盘上的模式，然后从记忆中提取与该模式关联的行动方案<sup>[7]</sup>。这对 Agent 意味着：与其让模型在每次调用时从头推理工具选择，不如通过 **few-shot examples** 或 **fine-tuning** 让模型学习「任务模式 → 工具序列」的映射。

2. **注意力过滤**：不是所有工具描述都需要放入上下文。根据任务类型预先过滤相关工具，减少搜索空间——这正是西蒙所说的「注意力的经济学」。

满意化原则在 LLM Agent 中的自发涌现，揭示了一个略带讽刺意味的事实：半个世纪的优化理论主导了 AI 研究，而真正在大规模部署中奏效的，依然是西蒙那个被新古典经济学嘲笑为「不够精确」的启发式框架。工具过滤、分支剪枝、早停机制，这些在 Agent 工程实践中被称为「性能优化」的手段，在西蒙的词汇表里有一个更准确的名字：有界搜索的制度化。然而满意化只解释了 Agent **如何停止搜索**，它没有回答 Agent **从哪里获得抱负水平**——即那个判断「够好了」的标准本身从何而来。这个问题，西蒙留给了组织理论，而 Agent 研究至今仍将其外包给 prompt 工程师。

---

## 三、近似可分解性：多 Agent 系统的架构原理

### 3.1 复杂系统的层级结构

西蒙在其 1962 年的经典论文「The Architecture of Complexity」中提出了一个深刻的观察：**几乎所有复杂系统都呈现层级结构（hierarchical structure），而这种层级结构具有近似可分解性（near-decomposability）**<sup>[8]</sup>。

近似可分解性是指：

- 在**短期**内，系统中各子系统的行为近似**独立**。
- 在**长期**内，子系统之间的交互影响才变得显著。
- 子系统**内部**的交互强度远大于子系统**之间**的交互强度。

西蒙用一个著名的寓言来说明层级结构的进化优势——**钟表匠的寓言**<sup>[8]</sup>：

> 两个钟表匠分别制作包含 1000 个零件的手表。第一个钟表匠将所有零件一次性组装，任何打断都导致全部散架，需要从头来过。第二个钟表匠将手表设计为 10 个子组件，每个子组件包含 10 个部分，每部分包含 10 个零件。即使被打断，他最多只需重做一个小部分。结果，第二个钟表匠的效率远远高于第一个。

### 3.2 对多 Agent 架构的直接映射

近似可分解性理论为多 Agent 系统设计提供了第一性原理级别的指导：

**（a）任务分解应遵循近似可分解性原则。** 将一个大任务分解为多个子任务时，分解方式应使得子任务之间的**信息依赖最小化**。这不是一个工程偏好，而是一个来自复杂系统理论的深层原则：近似可分解的系统具有更高的鲁棒性和可进化性。

**（b）Agent 之间的通信拓扑应匹配任务的依赖结构。** 如果两个子任务高度独立（短期内近似可分解），那么负责这两个子任务的 Agent 之间不需要频繁通信。反之，如果两个子任务紧密耦合，则对应的 Agent 应当有低延迟的通信通道。

**（c）层级式 Agent 架构不是偏好，而是必然。** 西蒙论证了层级结构在进化和工程中的普遍性。对于多 Agent 系统，这意味着：**纯粹的扁平式 Agent 集群（如所有 Agent 地位完全对等）在复杂任务中不太可能是最优架构**。相反，某种形式的层级——协调者 Agent + 执行者 Agent——几乎是不可避免的。

以我在 [CivAgent](https://github.com/LeoLin990405/civagent) 项目中的实践为例：57 种历史政体的架构映射，本质上也是在探索不同的层级结构和分解方式。唐代三省六部制的三级审核，正是一种强层级的近似可分解结构——中书省起草、门下省审议、尚书省执行，三者在各自职责范围内近似独立运作，仅通过制度化的接口（封驳、署名）进行交互。

### 3.3 中间层的涌现

西蒙指出，在近似可分解系统中，**中间层（intermediate levels）具有特殊的重要性**<sup>[8]</sup>。它们既提供了足够的抽象来管理复杂性，又保留了足够的细节来执行具体操作。

这对 Agent 系统的启示是：在用户请求和底层工具调用之间，应当存在**中间抽象层**。当前许多 Agent 框架的问题恰恰在于缺少这个中间层——用户的高层意图直接映射到低层工具调用，中间没有「计划」或「策略」层的缓冲。这就像试图用汇编语言直接编写操作系统——理论上可行，但在复杂性管理上是灾难性的。

ReWOO（Xu et al., 2023）<sup>[9]</sup> 和 Plan-and-Execute 架构试图解决这个问题，它们在推理和执行之间引入了显式的规划层。从西蒙的理论视角看，这是在 Agent 系统中建立「中间层」的正确方向。

近可分解性为 Agent 的模块化提供了比「关注点分离」更深刻的理论依据：它不仅是工程美学，而是复杂系统在演化压力下的生存策略。从 ReAct 到 ReWOO，Agent 架构正在无意识地向西蒙 1962 年在《复杂性的架构》中描绘的层级结构收敛——这本身就是对该理论预测力的一次迟到的实证。但西蒙同时指出，近可分解性是一个**关于现实世界的经验假设**，而非逻辑必然；当子系统之间的耦合超过某个阈值，整个分解就会失效。Agent 研究继承了西蒙的解题框架，却几乎没有继承他对这个框架**适用边界**的谨慎——而那个边界，恰恰是接下来真正困难的问题开始的地方。

---

## 四、人工科学与 Agent 作为设计产物

### 4.1 自然科学 vs. 人工科学

西蒙在 1969 年出版的《人工科学》（*The Sciences of the Artificial*）中提出了一个被严重低估的认识论框架<sup>[10]</sup>：

- **自然科学**研究「事物是什么样的」（what things are）。
- **人工科学（设计科学）**研究「事物应该是什么样的」（what things ought to be）——即如何设计人工物（artifacts）来达成目标。

人工物的核心特征是：它是**内部环境（inner environment）**和**外部环境（outer environment）**之间的**接口（interface）**。人工物的行为取决于三者的交互：

```
外部环境（任务需求、用户意图、数据）
        ↕  接口（Agent 的行为表现）
内部环境（模型架构、参数、提示词、工具集）
```

### 4.2 Agent 的「接口」本质

这个框架对 Agent 设计的启示是深刻的：

**Agent 的「智能」不完全是内部属性，而是内部环境与外部环境匹配的结果。** 西蒙用一个著名的比喻来说明这一点：一只蚂蚁在沙滩上走出的路径看起来非常复杂，但这种复杂性主要来自沙滩表面的复杂性（外部环境），而非蚂蚁自身的复杂性（内部环境）<sup>[10]</sup>。

> 「一只蚂蚁，被视为一种行为系统，其实相当简单。它的行为在时间维度上的表观复杂性，主要反映的是它所处环境的复杂性。」

类推到 AI Agent：一个 Agent 在解决复杂编程任务时展现出的「智能」，相当一部分来自它所操作的**环境**——文件系统的结构、代码库的组织方式、错误信息的可解释性、测试框架的反馈质量。**因此，优化 Agent 的性能不仅仅是优化模型本身，更要优化 Agent 所处的环境。**

这解释了为什么 Claude Code 的许多设计决策——如 `CLAUDE.md` 文件、项目级别的指令、结构化的工具返回值——本质上是在**优化外部环境**，使其与 Agent 的内部能力更好地匹配。同样，MCP（Model Context Protocol）的核心价值也是在于**标准化 Agent 与外部环境的接口**。

### 4.3 适应性行为与环境设计

西蒙的人工科学理论还暗示了一个重要的设计原则：**与其试图构建一个在所有环境中都表现出色的通用 Agent，不如为特定任务类别设计匹配的环境。** 这与当前 Agent 领域的「通用 vs. 专用」辩论直接相关。

从西蒙的视角看，Agent 的专业化不一定体现在模型参数的特化，而可能体现在**工具集、上下文模板和评估标准的特化**——即外部环境的特化。一个「编程 Agent」和一个「写作 Agent」可能使用完全相同的底层模型，但配备不同的工具、不同的系统提示和不同的停止准则。

这一对应绝非偶然的形式相似。当工程师反复实验「系统提示工程」，实质上是在重新发现西蒙 1969 年的核心命题：智能的边界由环境的结构决定，而非由处理器的能力决定。换言之，当前 Agent 开发中最昂贵的工程直觉——「好的 Prompt 胜过更大的模型」——不过是「人工科学」的一个工程推论。然而西蒙留下的警告尚未被领取：如果行为的复杂性来自环境设计，那么谁来设计设计者？这个元层面的问题，在今天的 Agent 框架里几乎无人追问。

---

## 五、注意力经济学与上下文窗口管理

### 5.1 信息过载的预言

西蒙在 1971 年的一次演讲中提出了他最具预见性的观点之一<sup>[3]</sup>：

> *「在信息丰富的世界中，信息的丰富意味着某种其他东西的匮乏：即被信息所消耗之物的匮乏。信息消耗的是什么，这是相当明显的：它消耗的是接收者的注意力。因此，信息的丰富造成了注意力的贫乏，以及在可能消耗注意力的过度丰富的信息源中有效分配注意力的需要。」*

这段话写于互联网普及之前三十年，但它对当代 Agent 系统的适用性令人震撼。

### 5.2 上下文窗口作为注意力资源

对于 LLM Agent 而言，**上下文窗口就是注意力资源**。它是有限的、不可再生的（在单次推理中），并且其中信息的分布方式直接影响 Agent 的决策质量。

西蒙的注意力经济学理论为上下文管理提供了以下设计原则：

**（a）信息的价值不在于其内容，而在于其对决策的边际贡献。** 这意味着上下文管理策略应当基于**信息的决策相关性**来排序，而非基于信息的时间顺序或来源重要性。一段与当前子任务高度相关的错误日志，其上下文价值远高于一段详细但与当前步骤无关的系统架构描述。

**（b）注意力分配应当与任务阶段匹配。** 在规划阶段，Agent 需要宏观信息（项目结构、需求描述）；在执行阶段，Agent 需要微观信息（具体代码、API 文档）。上下文的内容应当随着任务阶段的推进而**动态调整**。

**（c）摘要是注意力管理的核心机制。** 西蒙指出，层级组织中信息向上传递时必然经历摘要和抽象<sup>[1]</sup>。类比到 Agent：当上下文接近窗口限制时，早期的详细信息应当被**摘要替代**，只保留对后续决策有影响的关键结论。这正是 Claude Code 在对话接近上下文限制时自动进行消息压缩的理论基础。

### 5.3 「充分信息」的幻觉

西蒙的理论还警告我们警惕一个常见的 Agent 设计陷阱：**试图将所有可能相关的信息都塞入上下文**。这种做法表面上是「给 Agent 更多信息」，实际上可能**降低**决策质量——因为关键信息被淹没在无关信息的海洋中。

这与 RAG（Retrieval-Augmented Generation）系统的常见问题直接相关。简单地增加检索数量（top-k）并不总是提高回答质量，因为更多的检索结果意味着更多的注意力竞争。西蒙的理论建议：**RAG 系统的核心挑战不是检索更多信息，而是检索更少但更相关的信息。**

这不仅是架构上的对应，更是一次历史性的重蹈覆辙。西蒙在信息贫乏的时代提出注意力是稀缺资源；今天的 RAG 工程师在信息过剩的时代独立推导出同一结论，却往往对这段思想谱系浑然不觉。如果半个世纪前的答案已经指向「过滤优先于堆积」，当前大量以「更大知识库」为卖点的 Agent 产品，究竟是在推进技术，还是在重复错误？更值得警惕的是，西蒙的注意力理论本身也有未竟之处——他描述了瓶颈，但对于注意力分配的规范性标准，始终语焉不详，而这正是当前 Agent 系统同样悬而未决的核心难题。

---

## 六、产生式系统与 Agent 的认知架构

### 6.1 从 GPS 到产生式系统

西蒙和纽厄尔在 1957 年开发的**通用问题求解器（General Problem Solver, GPS）**是 AI 历史上第一个显式模拟人类问题求解过程的程序<sup>[4]</sup>。GPS 使用手段-目的分析来搜索问题空间，其架构基于**产生式规则（production rules）**：

```
IF  当前状态匹配条件 C
THEN  执行动作 A
```

这种 IF-THEN 规则的集合构成了一个**产生式系统（production system）**<sup>[11]</sup>。纽厄尔后来将这一思想发展为更完整的认知架构理论——ACT-R 和 SOAR，它们至今仍是认知科学中最有影响力的计算模型之一。

### 6.2 当代 Agent 框架中的产生式系统遗产

当代 Agent 框架中处处可见产生式系统的影子：

| 产生式系统概念 | 当代 Agent 对应 |
|---|---|
| 产生式规则（IF-THEN） | 系统提示中的条件指令（「如果用户要求 X，则使用工具 Y」） |
| 工作记忆（working memory） | 上下文窗口 |
| 长期记忆（long-term memory） | RAG、向量数据库、外部知识库 |
| 冲突解决（conflict resolution） | 当多条指令适用时的优先级逻辑 |
| 目标栈（goal stack） | 任务分解后的子目标队列 |

### 6.3 认知架构的现代复兴

值得注意的是，当前 Agent 研究中的许多「创新」概念——如 Reflexion（Shinn et al., 2023）<sup>[12]</sup> 中的自我反思机制、Voyager（Wang et al., 2023）<sup>[13]</sup> 中的技能库（skill library）——实际上与西蒙和纽厄尔数十年前在认知架构中研究的机制有深刻的同构关系：

- **Reflexion 的自我反思** ≈ SOAR 架构中的 **impasse detection + chunking**：当 Agent 遇到障碍时，回顾失败原因并生成新的规则。
- **Voyager 的技能库** ≈ ACT-R 中的 **procedural memory**：将成功的行动序列存储为可复用的程序。
- **MemGPT 的分层记忆** ≈ 西蒙描述的人类认知中 **短期记忆与长期记忆的交互**。

这不是巧合。西蒙和纽厄尔研究的是**智能行为的一般性结构**，而当代 Agent 系统——无论其底层技术是符号推理还是神经网络——都不可避免地需要面对同样的结构性问题。

这场「重新发明」的完成度之高，本身就是一个需要解释的现象。从 SOAR 到 ACT-R，再到今天挂载工具链的 LLM Agent，认知架构的基本骨架在半个世纪里几乎没有发生根本性的变化——变化的只是填充这副骨架的物质。这或许说明西蒙们当年抽象的层次是正确的：结构性约束比实现技术更持久。但这个结论也暗含一道裂缝：如果神经网络与符号系统面对的是同构问题，那么神经网络真正改变了什么？它究竟是解法的升级，还是只是用另一种语言重写了同一道未解方程？

---

## 七、组织理论与多 Agent 协调

### 7.1 组织作为信息处理系统

西蒙在《管理行为》及后续著作中将组织视为一种**信息处理系统**<sup>[1]</sup>。组织的核心功能不是控制行为，而是**塑造决策前提（decision premises）**。组织通过以下方式影响成员的决策：

- **权威（authority）**：指定谁有权做出某类决策。
- **沟通渠道（communication channels）**：决定信息的流向。
- **组织认同（organizational identification）**：影响成员在面临选择时偏向哪种目标。
- **培训和灌输（training and indoctrination）**：预先建立决策习惯和价值观。

### 7.2 多 Agent 系统作为虚拟组织

将这个框架应用到多 Agent 系统，可以得到一套组织性的设计原则：

**（a）Agent 间的「系统提示」即「组织文化」。** 共享的系统提示（或 `CLAUDE.md` 文件）为所有 Agent 建立了统一的决策前提，就像组织文化为所有成员提供了共同的价值观基础。

**（b）工具权限即组织权威。** 不同 Agent 能调用哪些工具，本质上定义了它们在组织中的「权限范围」。一个只有读取权限的 Agent 和一个有写入权限的 Agent，在组织层级中扮演着不同的角色——前者是分析师，后者是执行者。

**（c）Agent 间通信协议即组织的沟通渠道设计。** 西蒙指出，沟通渠道的设计深刻地影响着组织的决策质量和速度<sup>[1]</sup>。在多 Agent 系统中，Agent 之间如何传递信息（全文 vs. 摘要、同步 vs. 异步、广播 vs. 点对点）是影响系统性能的关键架构决策。

**（d）专业化与协调的权衡。** 西蒙描述的组织设计核心困境——**专业化（specialization）带来效率提升，但也带来协调成本增加**——在多 Agent 系统中同样存在。增加专业化 Agent（如专门的代码审查 Agent、测试 Agent、文档 Agent）可以提升单项任务的质量，但也增加了 Agent 间的协调开销。西蒙的理论建议：**专业化的边界应当沿着信息依赖关系的自然裂缝来划分**——即回到近似可分解性原则。

### 7.3 March-Simon 模型与 Agent 的动机设计

James March 和西蒙在 1958 年合著的《组织》（*Organizations*）中提出了一个关于组织成员行为的模型<sup>[14]</sup>：成员参与组织的决策取决于**诱因（inducements）**和**贡献（contributions）**的平衡。

虽然 AI Agent 没有「动机」，但这个框架对 Agent 系统的资源分配有启示：

- **诱因**可以类比为分配给 Agent 的**计算资源**（token 预算、工具访问权）。
- **贡献**可以类比为 Agent 对系统目标的**信息贡献**。
- 系统应当根据 Agent 的信息贡献动态调整其资源分配——高价值输出的 Agent 获得更多的计算预算和工具权限。

至此，我们已在七个维度上完成了从西蒙理论到当代 Agent 研究的系统性映射，这幅图景的对称之美几乎令人心安。然而正是这种整洁应当引发警觉——任何理论框架，当它能够优雅地解释一切时，往往意味着它还没有真正触及那些最坚硬的问题。西蒙本人对此心知肚明：他在描述有限理性时，同步标注了若干他认为尚不可解的难题，而那些难题在今天的 Agent 论文中几乎销声匿迹。接下来的部分将离开映射的安全地带，直面西蒙亲手划定的禁区——那些不是被解决了、而是被绕过了的深层张力。

---

## 八、西蒙框架的边界：符号主义遗产与连接主义现实的张力

西蒙的理论体系在人工智能的黎明期构建了一套优雅的认知架构。然而，当我们将其应用于以大型语言模型为核心的现代 AI Agent 时，三组深层张力开始浮现。这并非对西蒙遗产的否定，而是任何伟大理论在遭遇范式跃迁时必然经历的压力测试。

### 8.1 张力一：符号与亚符号的认识论鸿沟

西蒙与纽厄尔共同构建的通用问题求解器（GPS）和 SOAR 架构，其核心预设是：智能行为可以被分解为显式的符号操作序列。产生式系统中的每一条规则（IF-THEN 对）都是可检查、可修改、可解释的。当 SOAR 在棋盘问题上搜索时，研究者可以完整追踪其推理路径，定位每一步决策的依据。这种**认知透明性**（cognitive transparency）不仅是技术特征，更是西蒙认知科学纲领的核心承诺：理解智能意味着能够写出智能的程序。

然而，LLM 的计算基底根本上是亚符号的（subsymbolic）。权重矩阵中并不存在可被指认的「规则」；推理过程是数十亿参数的连续值激活在高维空间中的轨迹。Bengio（2019）将此区分与 Kahneman 的双系统理论相对应：符号系统对应缓慢、有意识、可语言化的系统二，而神经网络更接近快速、直觉性、难以内省的系统一<sup>[16]</sup>。

这一鸿沟对 Agent 设计产生了实质性影响。当我们在 Chain-of-Thought（Wei et al., 2022）<sup>[17]</sup> 框架中要求 LLM「展示推理步骤」时，我们实际上是在用符号主义的语言界面来包裹一个本质上非符号的计算过程。模型输出的「推理链」是生成过程的副产品，而非推理过程的忠实记录——这与 SOAR 的操作符轨迹有着本质区别。后者是计算过程本身的日志，前者更像是一个能说善道的「事后解释者」。

这意味着：当 Agent 在 Chain-of-Thought 中给出错误推理，纠错所需的干预点并不在那几行文字里，而在不可见的参数空间中。西蒙框架对「可检查推理」的依赖，在 LLM 时代遭遇了根本性的空洞化。

### 8.2 张力二：满意化标准的涌现性与不稳定性

西蒙满意化理论的深层假设是：决策主体存在一个相对稳定的期望水平（aspiration level），这一水平随经验动态调整，但在任意决策时刻是可界定的。这个假设使得「足够好」成为一个有意义的停止条件：理性主体知道自己在寻找什么，并且在找到时能够识别它。

LLM Agent 的「满意标准」却是根本性地涌现的、上下文依赖的。考虑一个常见场景：用同一个提示要求 GPT-4 三次总结同一篇论文，你将得到三个结构不同、侧重各异的摘要，且这三个版本的 Agent 都将宣称自己完成了任务。问题不在于随机采样（temperature）带来的表面差异，而在于没有一个稳定的内部表征对应「一份好的摘要应当包含什么」。满意标准本身是生成过程中浮现的，而非预先存在的收敛目标。

这在长程 Agent 任务中造成了严重的**对齐漂移（alignment drift）**问题。一个被要求「重构代码库直到质量满意」的 Agent，在不同运行中可能在截然不同的代码状态下停止，且每次都「认为」自己达到了标准。现代 Agent 系统提示中大量的具体化约束本质上是一种外部植入的伪满意标准——系统设计者在用显式规则弥补内部期望水平缺失这一结构性缺陷。

西蒙的满意化理论是对人类有限理性的精准刻画；而 LLM Agent 面临的，是一种更为奇特的困境：它不是理性受限的，而是**缺乏稳定偏好结构的**。这是满意化理论的适用前提失效，而非满意化策略本身的失效。

### 8.3 张力三：近似可分解性与任务边界的本质模糊

近似可分解性是西蒙系统科学中最具洞见的概念之一。复杂系统的稳健性和可理解性，根植于其层级结构中子系统之间的相对独立性。西蒙用「接缝」（joints）来描述近似可分解系统中的弱连接点——复杂系统可以沿着这些接缝被合理地拆分。

然而，当真实世界的 Agent 任务被推入这一框架时，分解边界的模糊性便成为不可回避的障碍。「重构这个代码库」这样的任务究竟应当分解为哪些子任务？不同的工程师会给出结构差异极大的分解方案，且每种方案都有其内在逻辑。更根本的问题是：这类任务没有自然的「接缝」。类型系统的修改会涉及测试、文档、API 接口乃至团队协作约定；抽取一个函数会触发跨文件的依赖重组。任务边界是主观的、协商的、语境依赖的。

在多 Agent 框架中，这一问题以任务分配争议的形式出现：当 Orchestrator Agent 将「重构数据层」委托给 Coder Agent 时，「数据层」的边界本身就是模糊的，委托关系中隐含的边界预设会沿着 Agent 链传导，直至在某个叶节点 Agent 处爆发为无法执行的指令歧义。近似可分解性理论告诉我们如何利用已存在的结构边界；**它没有告诉我们，当边界本身需要被创造和协商时该怎么办。**

[CivAgent](https://github.com/LeoLin990405/civagent) 将 57 种历史政体映射为 AI 多 Agent 架构的实践，深刻揭示了这一困境。部分政体天然贴合近似可分解原则——如波斯阿契美尼德帝国的总督制，各省代理人拥有高度自治权，彼此耦合极低，边界清晰；但雅典民主制的实现则完全相反：公民大会、议事会、陪审法庭三个 Agent 对同一议题均有决策权，职能边界在协议层无法预先划定，只能通过运行时投票动态协商。更具启示性的是唐朝三省六部制：中书省起草、门下省审驳、尚书省执行，三个 Agent 均触及「政策形成」这一核心职能，历史上刻意设计的职能重叠在 Agent 系统中被直接转化为消息竞争与任务归属争议，无法通过静态分解消除。这表明，近似可分解性本质上是政体设计者的历史选择，而非可以对任意组织架构普遍适用的工程假设——对于那些以制度性模糊为权力制衡手段的政体，Agent 边界的模糊不是实现缺陷，而是对原始制度逻辑的忠实还原。

### 8.4 三组张力的共同根源

上述三组张力并非孤立的技术问题，而是指向同一个深层认识论断裂：**西蒙的理论预设了一个具有稳定内部结构的推理主体**——固定的产生式规则、可界定的期望水平、持久身份的可分解子系统——**而 LLM Agent 是一个结构浮现于交互过程本身的动态系统**。这不是改进可以弥合的差距，而是需要新的理论框架来接管的空白地带。西蒙的遗产，或许最终将以负空间的形式发挥作用——它精确地勾勒出下一代 Agent 认知理论需要填补的那些位置。

---

## 九、结论：西蒙的遗产与 Agent 的未来

### 9.1 被遗忘的先知

西蒙的理论之所以对当代 Agent 设计如此相关，是因为他研究的不是某种特定技术，而是**智能行为在有限资源约束下的一般性结构**。无论智能的载体是人类大脑、符号推理程序还是大语言模型，以下约束都是不可逃避的：

1. 信息获取是有成本的。
2. 计算能力是有限的。
3. 注意力是稀缺资源。
4. 复杂系统需要层级结构来管理复杂性。
5. 搜索需要启发式来保持可行性。
6. 满意化通常优于最大化。

### 9.2 未被充分挖掘的理论资源

当前 Agent 研究社区在大量引用计算机科学文献的同时，对西蒙的跨学科贡献的引用明显不足。以下几个方向值得深入探索：

1. **满意化理论的形式化应用**：为 Agent 设计可配置的 aspiration level 和自适应停止规则，而非依赖固定的最大轮次或 token 限制。
2. **近似可分解性的定量分析**：开发度量方法来评估任务分解方案的「可分解性」，并据此优化多 Agent 的通信拓扑。
3. **注意力经济学的上下文管理**：将信息论和注意力分配理论引入 RAG 和上下文管理策略的设计。
4. **人工科学框架下的 Agent 评估**：将 Agent 性能评估从「内部能力测试」转向「内部-外部匹配度评估」——同一个 Agent 在不同环境（工具集、提示词、反馈机制）中的表现差异，可能比不同 Agent 在同一环境中的表现差异更大。

### 9.3 有限理性的机器

让我以西蒙在《人工科学》中的一段话来结束这篇文章<sup>[10]</sup>：

> *「人工物可以被理解为一个会合点——用今天的术语说，是一个'接口'——连接着'内部'环境（人工物自身的物质与组织）和'外部'环境（它所运作的周围条件）。如果内部环境与外部环境相适应，或反过来，人工物就能实现其预期目的。」*

当代 AI Agent 是人类制造的第一批真正意义上的「有限理性的机器」。它们与人类决策者面临同样类型的约束——有限的信息、有限的计算、有限的注意力。西蒙用毕生精力研究的理论框架，为我们理解和改进这些机器提供了一个被严重低估的知识宝库。

但正如第八章所论证的，西蒙的框架也有其边界：它预设了稳定的推理主体，而 LLM Agent 是结构浮现于交互过程的动态系统。在已解决的问题上，西蒙留给我们一张精确的地图；在未解决的问题上，他留给我们的是一个精确的轮廓——标记出下一代 Agent 认知理论需要填补的空白地带。

Agent 系统的未来不在于选择西蒙还是超越西蒙，而在于：**在他已经照亮的地方不再摸索，在他标注为黑暗的地方集中探照灯。**

---

## 参考文献

[1] Simon, H. A. (1947). *Administrative Behavior: A Study of Decision-Making Processes in Administrative Organization*. Macmillan. (第四版: 1997, Free Press)

[2] Liu, N. F., Lin, K., Hewitt, J., Paranjape, A., Bevilacqua, M., Petroni, F., & Liang, P. (2024). Lost in the Middle: How Language Models Use Long Contexts. *Transactions of the Association for Computational Linguistics*, 12, 157–173.

[3] Simon, H. A. (1971). Designing Organizations for an Information-Rich World. In M. Greenberger (Ed.), *Computers, Communications, and the Public Interest* (pp. 37–72). Johns Hopkins Press.

[4] Newell, A., & Simon, H. A. (1972). *Human Problem Solving*. Prentice-Hall.

[5] Yao, S., Zhao, J., Yu, D., Du, N., Shafran, I., Narasimhan, K., & Cao, Y. (2023). ReAct: Synergizing Reasoning and Acting in Language Models. In *ICLR 2023*.

[6] Simon, H. A. (1990). Invariants of Human Behavior. *Annual Review of Psychology*, 41, 1–19.

[7] Chase, W. G., & Simon, H. A. (1973). Perception in Chess. *Cognitive Psychology*, 4(1), 55–81.

[8] Simon, H. A. (1962). The Architecture of Complexity. *Proceedings of the American Philosophical Society*, 106(6), 467–482.

[9] Xu, B., Peng, Z., Lei, B., Mukherjee, S., Liu, Y., & Xu, D. (2023). ReWOO: Decoupling Reasoning from Observations for Efficient Augmented Language Models. *arXiv preprint arXiv:2305.18323*.

[10] Simon, H. A. (1969). *The Sciences of the Artificial*. MIT Press. (第三版: 1996)

[11] Newell, A. (1990). *Unified Theories of Cognition*. Harvard University Press.

[12] Shinn, N., Cassano, F., Gopinath, A., Narasimhan, K., & Yao, S. (2023). Reflexion: Language Agents with Verbal Reinforcement Learning. In *NeurIPS 2023*.

[13] Wang, G., Xie, Y., Jiang, Y., Mandlekar, A., Xiao, C., Zhu, Y., Fan, L., & Anandkumar, A. (2023). Voyager: An Open-Ended Embodied Agent with Large Language Models. *arXiv preprint arXiv:2305.16291*.

[14] March, J. G., & Simon, H. A. (1958). *Organizations*. Wiley.

[15] Kahneman, D. (2011). *Thinking, Fast and Slow*. Farrar, Straus and Giroux.

[16] Goyal, A., & Bengio, Y. (2022). Inductive Biases for Deep Learning of Higher-Level Cognition. *Proceedings of the Royal Society A*, 478(2266), 20210068.

[17] Wei, J., Wang, X., Schuurmans, D., Bosma, M., Ichter, B., Xia, F., Chi, E., Le, Q., & Zhou, D. (2022). Chain-of-Thought Prompting Elicits Reasoning in Large Language Models. In *NeurIPS 2022*.

</div>

<div class="lang-en" markdown="1">

> *"The capacity of the human mind for formulating and solving complex problems is very small compared with the size of the problems whose solution is required for objectively rational behavior in the real world — or even for a reasonable approximation to such objective rationality."*
> *— Herbert A. Simon, Administrative Behavior, 4th ed. (1997), p. xxix*

---

Since 2024, AI Agents have become the dominant paradigm of large language model applications. Yet beneath this wave of "intelligent agent" enthusiasm lies a troubling episode in the history of ideas: as engineers struggle with limited context windows, the question of when to stop searching, and the coordination costs of multi-agent systems, they are — in new vocabulary — reinventing problems that Herbert Simon solved systematically half a century ago: satisficing search, the economics of attention, near-decomposability. This collective amnesia is costly. It condemns current Agent research to replough already cultivated ground, while leaving the genuinely uncharted territory untouched.

Herbert Alexander Simon (1916–2001) was one of the twentieth century's rare interdisciplinary giants: winner of the 1978 Nobel Prize in Economics and the 1975 Turing Award, he made foundational contributions to political science, psychology, management, artificial intelligence, and cognitive science. His central idea — **bounded rationality** — not only reshaped economics and organizational theory but directly gave rise to several core concepts in modern AI.

The deeper irony, however, is this: Simon did not merely solve these problems — he also explicitly marked the ones he **could not** solve. Within his bounded rationality framework, several core difficulties were labeled by Simon himself as "unfinished business": how decision premises can propagate coherently across multi-level hierarchies without distortion; how aspiration levels themselves can adaptively evolve with experience; how a complex artifact can sustain adaptation when both its inner and outer environments shift simultaneously. These open problems Simon left behind are precisely where today's Agent architectures are most fragile: goal drift in long-horizon tasks, coherence collapse in cross-session memory, coordination costs that scale exponentially as multi-agent systems grow.

The argument of this article is therefore twofold. **First**, many of the "innovations" in current Agent research are, on Simon's theoretical map, merely rediscoveries of known coordinates — recognizing this allows us to recover sixty years of his scholarship at a fraction of the cost. **Second**, and more importantly: the deeper challenges Simon explicitly marked as unsolved are the true signposts toward next-generation Agent architecture. Reinventing what Simon already solved is wasteful; ignoring the open problems he left behind is a more profound intellectual loss.

The eight chapters that follow will unfold this obscured map in turn — the first seven surveying known territory, the eighth entering the boundary zones of Simon's own framework.

---

## I. Bounded Rationality: The First Principle of Agent Design

### 1.1 From "Economic Man" to "Administrative Man"

Simon's central contribution to economics was a systematic critique of the neoclassical "fully rational economic man" assumption. In his 1947 doctoral dissertation *Administrative Behavior*, Simon argued that real-world decision-makers face three fundamental constraints<sup>[1]</sup>:

1. **Information constraints**: Decision-makers cannot obtain all relevant information.
2. **Computational constraints**: Even when information is available, decision-makers lack sufficient computational capacity to process all of it.
3. **Attention constraints**: Human attention is a scarce resource; one cannot attend to all dimensions simultaneously.

Consequently, decision-makers do not **maximize utility** but rather **satisfice** — they search for a solution that meets a minimally acceptable standard and then stop searching.

### 1.2 LLM Agents as Perfect Instances of Bounded Rationality

The correspondence between this theoretical framework and contemporary LLM Agents is almost strikingly precise:

| Simon's Bounded Rationality Constraints | LLM Agent's Corresponding Constraints | Concrete Manifestations |
|---|---|---|
| Information constraints | **Limited context window** | Claude 200K tokens, GPT-4 128K tokens — anything beyond is "forgotten" |
| Computational constraints | **Limited computational budget per inference** | Inference time, token generation rate, and depth of chain reasoning are all constrained |
| Attention constraints | **Effectively limited range of the attention mechanism** | The "lost-in-the-middle" problem<sup>[2]</sup> — information in the middle of long contexts is ignored |

Liu et al. (2024) empirically demonstrated in their "Lost in the Middle" study that the attention distribution of LLMs follows a U-shaped curve: models are significantly more sensitive to information at the beginning and end of the context than to information in the middle<sup>[2]</sup>. This closely parallels the **primacy effect** and **recency effect** in cognitive psychology — phenomena that Simon had already described in the 1950s when studying human information processing.

### 1.3 Implications for Agent Design: Embracing Limitation

The central lesson of Simon's theory is not "how to overcome limitation" but rather **"how to make sufficiently good decisions under the constraints of limitation."** For Agent design, this means:

**(a) Abandon the illusion of global optimality.** Many Agent frameworks attempt to approximate optimal reasoning paths through Chain-of-Thought or Tree-of-Thought. Simon would point out that when the search space grows exponentially, exhaustive search is itself irrational. Truly rational behavior requires **heuristics** for pruning.

**(b) Design explicit stopping rules.** The heart of satisficing theory is **when to stop searching**. Most current Agent frameworks lack clear stopping criteria — they either terminate passively when the token limit is reached or rely on the model's own "judgment." Simon's theory suggests that Agents should have an **explicit aspiration level**: once a solution meeting that level is found, search should stop.

**(c) Context management is attention management.** In his famous 1971 dictum, Simon wrote: "In an information-rich world, the wealth of information means a dearth of something else — a scarcity of whatever it is that information consumes."<sup>[3]</sup> For Agents, the context window *is* attention. Therefore, **the context management strategy — what information to include in the context, what to summarize, what to discard — is one of the most central design decisions in Agent architecture**, not an engineering detail.

What should give us pause is not that Agent engineers arrived at context management — it is that they arrived at it as though arriving somewhere new. Simon had named this territory in 1956, mapped its contours in *The Sciences of the Artificial*, and left signposts that the field spent decades largely ignoring. The reinvention is not a failure of engineering; it is a failure of intellectual memory. And yet the mapping exposed here is only the surface of the problem: bounded rationality tells us *why* cognition must be selective, but it does not tell us *how* to select wisely — a question Simon himself regarded as radically open, and one that contemporary Agent design has barely begun to face.

---

## II. Satisficing Search and Agent Planning Strategies

### 2.1 Search as the Basic Mechanism of Decision-Making

In their collaboration from the 1950s through the 1970s, Simon and Allen Newell formalized problem-solving as **search through a problem space**<sup>[4]</sup>. Their core framework consists of:

- **Initial state**: The current description of the problem
- **Goal state**: The desired outcome
- **Operators**: Available operations or transformations
- **Search strategy**: The method for selecting and applying operators

This framework maps directly onto the contemporary Agent paradigm of ReAct (Reasoning + Acting)<sup>[5]</sup>:

| Problem Space Concept | Corresponding Agent Concept |
|---|---|
| Initial state | User prompt + current environment state |
| Goal state | Task completion condition |
| Operators | Available tools / function calls |
| Search strategy | LLM reasoning + tool selection logic |

### 2.2 Means-Ends Analysis

The **Means-Ends Analysis (MEA)** proposed by Simon and Newell is their most influential problem-solving strategy<sup>[4]</sup>. The core logic of MEA is:

1. Compare the current state with the goal state and identify the **difference**.
2. Search for an operator that **reduces this difference**.
3. If the preconditions of that operator are not satisfied, **recursively** make satisfying those preconditions a subgoal.

This is essentially the same idea as contemporary Agent **hierarchical planning** and **subgoal decomposition**. For example, when Claude Code receives the instruction "refactor this module," its implicit reasoning process is:

```
Goal: Refactor module X
Current state: Module X contains functions A, B, C with code duplication
Difference: Code duplication, high coupling
Available operators: Read (read files), Edit (edit files), Grep (search patterns), Bash (run tests)
Subgoal 1: Understand the current code structure (operators: Read, Grep)
Subgoal 2: Identify duplicate patterns (operator: Grep)
Subgoal 3: Extract common logic (operator: Edit)
Subgoal 4: Verify correctness of refactoring (operator: Bash → run tests)
```

### 2.3 Heuristic Search and "Good Enough" Tool Selection

Simon repeatedly emphasized that in complex problems, exhaustive search is infeasible — **heuristics are a necessary condition for rational behavior**<sup>[6]</sup>.

This has direct implications for Agent tool selection. A core problem facing current Agents is that as the number of available tools increases, the accuracy of tool selection decreases. This is fundamentally a search-space explosion problem. Simon's theory recommends the following strategies:

1. **Recognition-then-act**: In studying chess grandmasters, Simon found that experts do not play chess by means of deep search but through **pattern recognition** — recognizing patterns on the board and retrieving associated moves from memory<sup>[7]</sup>. For Agents, this implies that rather than having the model reason from scratch about tool selection on each call, it is better to use **few-shot examples** or **fine-tuning** to teach the model a mapping from "task pattern → tool sequence."

2. **Attention filtering**: Not all tool descriptions need to be placed in the context. Pre-filtering relevant tools by task type reduces the search space — this is precisely what Simon called "the economics of attention."

The convergence is almost too neat to be coincidental, and yet the literature treats it as coincidence. Beam search, tool retrieval, chain-of-thought pruning — each has been published as a contribution to Agent systems engineering, each recapitulates a move Simon had already formalized under the banner of heuristic search and the economics of attention. One might charitably call this parallel discovery; one might less charitably call it a field reading its own outputs while the library sits unvisited. Either way, the deeper irony is this: Simon did not present satisficing search as a solution. He presented it as the beginning of a harder question — namely, what makes a heuristic *good enough*, and for whom, and under what collapse of the environment? Those questions remain, and current Agent benchmarks are largely designed to avoid asking them.

---

## III. Near-Decomposability: The Architectural Principle of Multi-Agent Systems

### 3.1 The Hierarchical Structure of Complex Systems

In his landmark 1962 paper "The Architecture of Complexity," Simon advanced a profound observation: **nearly all complex systems exhibit hierarchical structure, and this hierarchical structure possesses near-decomposability**<sup>[8]</sup>.

Near-decomposability means:

- In the **short run**, the behavior of each subsystem within the overall system is approximately **independent**.
- In the **long run**, the interaction effects between subsystems become significant.
- The intensity of interactions **within** subsystems is far greater than the intensity of interactions **between** subsystems.

Simon used a famous parable to illustrate the evolutionary advantage of hierarchical structure — **the Watchmaker Parable**<sup>[8]</sup>:

> Two watchmakers each assemble a watch containing 1,000 parts. The first assembles all parts in a single sequence; any interruption causes everything to fall apart and must be started over from scratch. The second designs his watch as 10 sub-assemblies, each containing 10 parts, each part comprising 10 components. Even if interrupted, he need only redo one small section at most. The result: the second watchmaker vastly outperforms the first.

### 3.2 Direct Mapping to Multi-Agent Architecture

The near-decomposability theory provides first-principles guidance for multi-agent system design:

**(a) Task decomposition should follow the principle of near-decomposability.** When breaking a large task into subtasks, the decomposition should minimize **information dependencies** between subtasks. This is not an engineering preference but a deep principle from complex systems theory: near-decomposable systems are more robust and more evolvable.

**(b) The communication topology between Agents should match the dependency structure of the task.** If two subtasks are highly independent (near-decomposable in the short run), the Agents responsible for those subtasks need not communicate frequently. Conversely, if two subtasks are tightly coupled, the corresponding Agents should have low-latency communication channels.

**(c) Hierarchical Agent architecture is not a preference but a necessity.** Simon argued for the universality of hierarchical structure in both evolution and engineering. For multi-agent systems, this implies that **purely flat Agent clusters — where all Agents are fully peer-level — are unlikely to be the optimal architecture for complex tasks**. Instead, some form of hierarchy — coordinator Agents plus executor Agents — is nearly unavoidable.

To draw on my own work with the [CivAgent](https://github.com/LeoLin990405/civagent) project as an example: the architectural mapping of 57 historical polities is, in essence, an exploration of different hierarchical structures and decomposition strategies. The Tang Dynasty's Three Departments and Six Ministries system, with its three-level review process, is a strongly hierarchical near-decomposable structure — the Secretariat drafted, the Chancellery deliberated, and the Department of State Affairs executed, each operating approximately independently within its own sphere of responsibility and interacting only through institutionalized interfaces (vetoes, countersignatures).

### 3.3 The Emergence of Intermediate Levels

Simon noted that in near-decomposable systems, **intermediate levels carry special importance**<sup>[8]</sup>. They provide sufficient abstraction to manage complexity while retaining sufficient detail to carry out specific operations.

The implication for Agent systems is that **intermediate abstraction layers** should exist between user requests and low-level tool calls. The problem with many current Agent frameworks is precisely the absence of this intermediate layer — high-level user intent maps directly to low-level tool calls, with no buffering "planning" or "strategy" layer in between. This is analogous to trying to write an operating system directly in assembly language: theoretically possible, but catastrophic for managing complexity.

ReWOO (Xu et al., 2023)<sup>[9]</sup> and the Plan-and-Execute architecture attempt to address this problem by introducing an explicit planning layer between reasoning and execution. From Simon's theoretical perspective, this is the right direction for establishing an "intermediate level" in Agent systems.

There is something quietly revealing about the fact that hierarchical Agent architectures are consistently framed in the literature as systems innovations rather than as rediscoveries of a principle Simon articulated when the computers filling rooms could barely parse a sentence. Near-decomposability was never just a structural observation; it was a claim about the *conditions under which complex problem-solving becomes tractable at all* — a claim with strong normative implications for how systems should be designed and where they should be expected to fail. ReWOO and Plan-and-Execute get the architecture roughly right. What they inherit along with the architecture, however, are all the hard questions Simon deferred: how to decompose when subsystem boundaries are unclear, how to recompose when local optima conflict, and what happens when the environment refuses to stay nearly decomposed. Those are not engineering footnotes. They are the problems Simon marked unsolved, and they are waiting in the chapters ahead.

---

## IV. The Sciences of the Artificial and Agents as Designed Artifacts

### 4.1 Natural Science vs. The Sciences of the Artificial

In *The Sciences of the Artificial*, published in 1969, Simon advanced an epistemological framework that has been seriously underappreciated<sup>[10]</sup>:

- **Natural science** studies "what things are."
- **The sciences of the artificial (design science)** study "what things ought to be" — that is, how to design artifacts to achieve goals.

The defining characteristic of an artifact is that it serves as an **interface** between an **inner environment** (its own structure and mechanisms) and an **outer environment** (the goals and conditions it must satisfy). The behavior of an artifact depends on the interaction among all three:

```
Outer environment (task requirements, user intent, data)
        ↕  Interface (the Agent's observable behavior)
Inner environment (model architecture, parameters, prompts, toolset)
```

### 4.2 The Interfacial Nature of Agents

This framework has profound implications for Agent design:

**An Agent's "intelligence" is not solely an internal property but the result of the match between its inner and outer environments.** Simon illustrated this point with a famous metaphor: the path an ant traces on a beach appears highly complex, but that complexity derives mainly from the complexity of the beach's surface (the outer environment) rather than from the ant's own complexity (the inner environment)<sup>[10]</sup>.

> "An ant, viewed as a behaving system, is quite simple. The apparent complexity of its behavior over time is largely a reflection of the complexity of the environment in which it finds itself."

By analogy: the "intelligence" an AI Agent exhibits in solving complex programming tasks derives substantially from the **environment** it operates in — the structure of the file system, the organization of the codebase, the interpretability of error messages, the feedback quality of the testing framework. **Consequently, optimizing Agent performance is not solely a matter of optimizing the model itself; it also requires optimizing the environment in which the Agent operates.**

This explains why many of Claude Code's design decisions — such as `CLAUDE.md` files, project-level instructions, and structured tool return values — are fundamentally about **optimizing the outer environment** so that it better matches the Agent's inner capabilities. Similarly, the core value of MCP (Model Context Protocol) lies in **standardizing the interface between Agents and their outer environment**.

### 4.3 Adaptive Behavior and Environment Design

Simon's theory of the sciences of the artificial also implies an important design principle: **rather than trying to build a universal Agent that performs well in all environments, design the environment to match the task category.** This is directly relevant to the ongoing "generalist vs. specialist" debate in the Agent field.

From Simon's perspective, Agent specialization need not reside in the specialization of model parameters; it may instead reside in the specialization of the **toolset, context templates, and evaluation criteria** — that is, the specialization of the outer environment. A "coding Agent" and a "writing Agent" may use exactly the same underlying model but be equipped with different tools, different system prompts, and different stopping criteria.

The irony is almost too neat to ignore: decades after Simon demonstrated that intelligent behavior is a product of environment as much as mind, the Agent research community has arrived at the same conclusion through sheer empirical necessity. Every specialized Agent is, in Simon's precise sense, an *artifact* — its apparent competence a reflection of the niche it was designed to inhabit rather than any general faculty within. The proliferation of domain-specific Agents is not a sign of the field's maturity; it is a sign of its unwitting Simonianism. What remains conspicuously absent from most current discourse is Simon's harder question: if intelligence is so thoroughly environmental, what exactly are we attributing to the model itself, and what to the scaffold we have so carefully built around it?

---

## V. The Economics of Attention and Context Window Management

### 5.1 The Prophecy of Information Overload

In a 1971 lecture, Simon advanced one of his most prescient observations<sup>[3]</sup>:

> *"In an information-rich world, the wealth of information means a dearth of something else: a scarcity of whatever it is that information consumes. What information consumes is rather obvious: it consumes the attention of its recipients. Hence a wealth of information creates a poverty of attention and a need to allocate that attention efficiently among the overabundance of information sources that might consume it."*

These words were written thirty years before the widespread adoption of the internet, yet their applicability to contemporary Agent systems is remarkable.

### 5.2 The Context Window as an Attentional Resource

For LLM Agents, **the context window is the attentional resource**. It is finite, non-renewable within a single inference, and the distribution of information within it directly affects the quality of the Agent's decisions.

Simon's economics-of-attention theory yields the following design principles for context management:

**(a) The value of information lies not in its content but in its marginal contribution to the decision at hand.** This means context management strategies should rank information by its **decision-relevance**, not by its temporal order or the importance of its source. An error log highly relevant to the current subtask carries far more context value than a detailed but presently irrelevant description of system architecture.

**(b) Attention allocation should match the phase of the task.** During the planning phase, the Agent needs macro-level information (project structure, requirements); during the execution phase, it needs micro-level information (specific code, API documentation). The content of the context should **dynamically adjust** as the task progresses through its phases.

**(c) Summarization is the core mechanism of attention management.** Simon noted that information passing upward through hierarchical organizations inevitably undergoes summarization and abstraction<sup>[1]</sup>. By analogy, as an Agent's context approaches the window limit, detailed information from earlier in the conversation should be **replaced by summaries**, retaining only the key conclusions that bear on subsequent decisions. This is precisely the theoretical basis for Claude Code's automatic message compression when conversations approach the context limit.

### 5.3 The Illusion of "Sufficient Information"

Simon's theory also warns against a common Agent design trap: **attempting to pack all potentially relevant information into the context**. This approach appears to be "giving the Agent more information" but may actually **reduce** decision quality — because critical information gets buried in an ocean of irrelevant content.

This is directly relevant to a common problem in RAG (Retrieval-Augmented Generation) systems. Simply increasing the number of retrieved passages (top-k) does not always improve answer quality, because more retrieved results means more competition for attention. Simon's theory suggests: **the central challenge for RAG systems is not to retrieve more information, but to retrieve less — yet more relevant — information.**

Simon called it *the bottleneck of attention*; we call it *context window management* — the terminology has changed, the problem has not moved an inch. The entire RAG apparatus, with its embeddings and re-rankers and hybrid retrieval pipelines, is an elaborate engineering response to a cognitive constraint that Simon formalized in the 1950s. We have, in essence, built hydraulic systems to route water through a pipe whose diameter Simon already measured. The troubling implication is this: if bounded rationality is a structural feature of any intelligent system operating under resource constraints — and Simon believed it was — then no retrieval strategy, however sophisticated, dissolves the problem; it merely relocates it.

---

## VI. Production Systems and the Cognitive Architecture of Agents

### 6.1 From GPS to Production Systems

The **General Problem Solver (GPS)**, developed by Simon and Newell in 1957, was the first program in AI history to explicitly simulate human problem-solving processes<sup>[4]</sup>. GPS used means-ends analysis to search problem spaces, and its architecture was based on **production rules**:

```
IF  current state matches condition C
THEN  execute action A
```

A set of such IF-THEN rules constitutes a **production system**<sup>[11]</sup>. Newell later developed this idea into the more complete cognitive architecture theories of ACT-R and SOAR, which remain among the most influential computational models in cognitive science.

### 6.2 The Production System Legacy in Contemporary Agent Frameworks

The shadow of production systems is visible throughout contemporary Agent frameworks:

| Production System Concept | Contemporary Agent Counterpart |
|---|---|
| Production rules (IF-THEN) | Conditional instructions in system prompts ("If the user requests X, use tool Y") |
| Working memory | Context window |
| Long-term memory | RAG, vector databases, external knowledge stores |
| Conflict resolution | Priority logic when multiple instructions apply |
| Goal stack | The queue of subgoals following task decomposition |

### 6.3 The Modern Revival of Cognitive Architecture

It is worth noting that many concepts presented as "innovations" in current Agent research — such as the self-reflection mechanism in Reflexion (Shinn et al., 2023)<sup>[12]</sup> and the skill library in Voyager (Wang et al., 2023)<sup>[13]</sup> — bear deep structural correspondences to mechanisms that Simon and Newell studied in cognitive architecture decades earlier:

- **Reflexion's self-reflection** ≈ **impasse detection + chunking** in the SOAR architecture: when an Agent encounters an obstacle, it reviews the reasons for failure and generates new rules.
- **Voyager's skill library** ≈ **procedural memory** in ACT-R: successful action sequences are stored as reusable procedures.
- **MemGPT's hierarchical memory** ≈ the **interaction between short-term and long-term memory** in human cognition as described by Simon.

This is not coincidence. Simon and Newell were studying the **general structure of intelligent behavior**, and contemporary Agent systems — regardless of whether their underlying technology is symbolic reasoning or neural networks — inevitably face the same structural problems.

What the cognitive architecture revival of the 1980s failed to achieve through explicit symbol manipulation, the Agent engineering of the 2020s is attempting to achieve through learned representations and probabilistic inference — yet the *architecture* remains stubbornly isomorphic. Working memory, long-term retrieval, goal prioritization, conflict resolution between competing rules: these are not implementation details that a sufficiently large neural network will eventually render obsolete; they are load-bearing joints in any system complex enough to be called an agent at all. Simon and Newell understood this because they were trying to build such systems from scratch and kept running into the same walls. Current researchers, arriving at those same walls from the opposite direction, would do well to read what was written on them.

---

## VII. Organizational Theory and Multi-Agent Coordination

### 7.1 Organizations as Information-Processing Systems

In *Administrative Behavior* and subsequent works, Simon conceived of organizations as **information-processing systems**<sup>[1]</sup>. The core function of an organization is not to control behavior but to **shape decision premises**. Organizations influence members' decisions through:

- **Authority**: Specifying who has the right to make which kinds of decisions.
- **Communication channels**: Determining the flow of information.
- **Organizational identification**: Influencing which goals members favor when facing choices.
- **Training and indoctrination**: Pre-establishing decision habits and values.

### 7.2 Multi-Agent Systems as Virtual Organizations

Applying this framework to multi-agent systems yields a set of organizational design principles:

**(a) The shared system prompt is the "organizational culture."** A shared system prompt (or `CLAUDE.md` file) establishes unified decision premises for all Agents, just as organizational culture provides a common value foundation for all members.

**(b) Tool permissions are organizational authority.** Which tools different Agents can invoke essentially defines their "scope of authority" within the organization. An Agent with read-only access and one with write access play different roles in the organizational hierarchy — the former is an analyst, the latter an executor.

**(c) Inter-agent communication protocols are the design of organizational communication channels.** Simon observed that the design of communication channels profoundly affects both the quality and speed of organizational decisions<sup>[1]</sup>. In multi-agent systems, how Agents pass information to one another — full text vs. summary, synchronous vs. asynchronous, broadcast vs. point-to-point — is a critical architectural decision affecting overall system performance.

**(d) The trade-off between specialization and coordination.** The core dilemma of organizational design that Simon described — **specialization brings efficiency gains but also increases coordination costs** — exists equally in multi-agent systems. Adding specialized Agents (e.g., a dedicated code-review Agent, a testing Agent, a documentation Agent) can improve the quality of individual tasks but also increases inter-agent coordination overhead. Simon's theory suggests: **the boundaries of specialization should be drawn along the natural fault lines of information dependencies** — which brings us back to the principle of near-decomposability.

### 7.3 The March-Simon Model and Agent Incentive Design

In *Organizations* (1958), co-authored with James March, Simon advanced a model of organizational member behavior<sup>[14]</sup>: a member's participation in an organization depends on the balance between **inducements** and **contributions**.

Although AI Agents have no "motivations," this framework has implications for resource allocation in Agent systems:

- **Inducements** can be analogized to the **computational resources** allocated to an Agent (token budget, tool access).
- **Contributions** can be analogized to an Agent's **informational contribution** to system goals.
- The system should dynamically adjust resource allocation based on each Agent's informational contribution — Agents producing high-value outputs receive larger computational budgets and broader tool permissions.

The mapping is, at this point, uncomfortably precise: Simon's organizational theory was never merely a theory of firms, but a theory of any distributed system in which bounded agents must coordinate under uncertainty — and that is exactly what a multi-agent LLM pipeline is. Budget allocation as attention allocation, tool permissions as authority structures, inter-agent messaging as organizational communication: the correspondences are not metaphors but isomorphisms. Yet elegance in mapping should provoke suspicion as much as satisfaction. Simon's organizational theory was equally elegant, and it did not spare him — or us — from the genuinely hard problems that no amount of structural clarity resolves: the emergence of misaligned incentives, the brittleness of coordination under novel conditions, and the question of what it even means for a distributed system to *reason* rather than merely to route. Those problems do not appear in the mapping. They are what the mapping quietly inherits.

---

## VIII. The Boundaries of Simon's Framework: The Tension Between Symbolic Legacy and Connectionist Reality

Simon's theoretical framework offered an elegant cognitive architecture at the dawn of artificial intelligence. Yet as we extend these ideas to modern AI agents built on large language models, three fundamental tensions emerge — not as refutations of Simon's legacy, but as the kind of pressure tests that any great theory must face when the paradigm beneath it shifts.

### 8.1 Tension 1: The Epistemic Gap Between Symbolic and Subsymbolic Computation

The General Problem Solver and SOAR architecture that Simon developed with Newell rested on a foundational premise: intelligent behavior can be decomposed into explicit sequences of symbol manipulation. Every production rule in these systems — every IF-THEN pair — is inspectable, modifiable, and accountable. When SOAR navigates a puzzle, researchers can reconstruct its entire reasoning trace. This *cognitive transparency* was not merely a technical convenience; it was the programmatic core of Simon's cognitive science: to understand intelligence is to be able to write it down as a program.

LLMs operate on an altogether different substrate. There are no identifiable "rules" in a weight matrix; inference is the trajectory of billions of continuous-valued activations through a high-dimensional space. Bengio (2019) mapped this distinction onto Kahneman's dual-process theory: symbolic systems align with the slow, deliberate System 2, while neural networks resemble the fast, intuitive, largely opaque System 1<sup>[16]</sup>.

When frameworks like Chain-of-Thought prompting (Wei et al., 2022)<sup>[17]</sup> ask an LLM to "show its reasoning," we are wrapping a fundamentally non-symbolic computation in a symbolic interface. The reasoning chain in the output is a byproduct of the generation process, not a faithful log of inference — a crucial distinction from SOAR's operator traces, which *are* the computation's own record. The chain-of-thought is better understood as a post-hoc articulation by a remarkably fluent narrator than as mechanistic transparency. When an agent reasons its way to an error in a CoT chain, the leverage point for intervention is not in those visible sentences but in an inaccessible parameter space. Simon's dependence on inspectable reasoning loses its grip precisely where we would most want to apply it.

### 8.2 Tension 2: The Instability of the Aspiration Level

Satisficing theory rests on a foundational assumption that is easy to overlook: the decision-maker possesses a reasonably stable aspiration level — one that adjusts dynamically with experience but is, at any given moment, a definable target. This is what makes "good enough" meaningful as a stopping criterion.

The "satisficing standard" of an LLM agent is constitutively emergent and context-dependent. Prompt the same model three times to summarize the same paper and you will receive three structurally distinct summaries with different emphases, all reporting task completion. The variation is not merely the surface noise of temperature sampling — it reflects the absence of any stable internal representation corresponding to "what a good summary should contain." The stopping criterion crystallizes during generation rather than governing it.

This creates a serious **alignment drift** problem in long-horizon agentic tasks. An agent instructed to "refactor the codebase until quality is satisfactory" may terminate at wildly different code states across runs, each time sincerely reporting that the bar has been met. The elaborate specificity of modern system prompts represents a structural workaround: external rule injection compensating for the absence of an internal aspiration level.

Satisficing theory is a precise account of human bounded rationality. LLM agents face something stranger: not the limits of rationality, but **the absence of a stable preference structure** over which rationality could operate. The failure mode is not that satisficing breaks down — it is that the prerequisite for satisficing is missing.

### 8.3 Tension 3: Near-Decomposability and the Essential Vagueness of Task Boundaries

Near-decomposability is among the most durable insights in Simon's science of design. The robustness of complex systems derives from the relative independence of subsystems within a hierarchy. Simon used the word "joints" to describe the natural cleavage points where complex systems can be sensibly pulled apart.

The trouble with realistic agent tasks is that they often lack discoverable joints. "Refactor this codebase" — how should it be decomposed? Different engineers would produce decompositions that differ not just in granularity but in fundamental structure, and each would be internally defensible. More importantly, the task's natural boundaries shift as work proceeds: modifying the type system cascades into tests, documentation, API contracts, and team conventions. The boundaries are not objective features of the task to be discovered; they are negotiated, subjective, and context-dependent.

In multi-agent frameworks, this vagueness propagates through delegation chains. When an orchestrator assigns "handle the data layer" to a coder agent, the implicit boundary assumptions travel down the agent graph until they erupt as unresolvable ambiguity at a leaf node. Near-decomposability theory gives us a vocabulary for exploiting existing structural boundaries; **it offers no guidance for settings where the boundaries themselves must be invented and negotiated as part of the task.**

The [CivAgent](https://github.com/LeoLin990405/civagent) project — mapping 57 historical polities to AI multi-agent architectures — offers a concrete stress-test of this thesis. Some polities map cleanly: the Achaemenid satrapy system instantiates nearly autonomous provincial agents with minimal inter-dependency, exhibiting the low cross-subsystem coupling that near-decomposability requires. Athenian democracy resists this structure entirely: the assembly, council, and jury-court agents all hold legitimate authority over the same decisions, and no static boundary assignment can resolve their overlapping jurisdictions — coordination must be negotiated at runtime through voting. Most instructive is the Tang dynasty's Three-Chancellery system, in which the Zhongshu (drafting), Menxia (review), and Shangshu (execution) chancelleries each touch the same policy-formation function; the deliberate redundancy that made the system resilient as a human institution manifests as message contention and task-ownership ambiguity in the agent layer. Across all 57 regimes, CivAgent reveals that near-decomposability is a property of a particular polity's design philosophy, not a universal substrate: for governance systems that weaponize institutional ambiguity as a check on power, fuzzy agent boundaries are not implementation failures but faithful encodings of the original organizational logic.

### 8.4 The Common Root of All Three Tensions

These three tensions share a common root. Simon's framework presupposes a reasoning agent with a *stable internal structure* — fixed production rules, an identifiable aspiration level, decomposable subsystems with persistent identities. LLM agents are dynamic systems whose structure emerges from interaction rather than persisting between episodes. This is not a gap that incremental refinement can close; it marks the boundary of an existing theoretical domain and the beginning of an unoccupied one. Simon's legacy may ultimately function as a kind of photographic negative — its precise contours defining exactly the shape of the theoretical work that remains to be done.

---

## IX. Conclusion: Simon's Legacy and the Future of Agents

### 9.1 The Forgotten Prophet

The reason Simon's theories are so relevant to contemporary Agent design is that he was not studying any particular technology but rather **the general structure of intelligent behavior under constraints of limited resources**. Whether the vehicle of intelligence is the human brain, a symbolic reasoning program, or a large language model, the following constraints are inescapable:

1. Acquiring information has costs.
2. Computational capacity is finite.
3. Attention is a scarce resource.
4. Complex systems require hierarchical structure to manage complexity.
5. Search requires heuristics to remain feasible.
6. Satisficing is usually superior to maximizing.

### 9.2 An Underutilized Theoretical Resource

While the current Agent research community cites computer science literature extensively, it draws notably little on Simon's interdisciplinary contributions. The following directions merit deeper exploration:

1. **Formal application of satisficing theory**: Designing configurable aspiration levels and adaptive stopping rules for Agents, rather than relying on fixed maximum turn counts or token limits.
2. **Quantitative analysis of near-decomposability**: Developing metrics to evaluate the "decomposability" of task decomposition schemes and using them to optimize multi-agent communication topologies.
3. **Context management through the economics of attention**: Bringing information theory and attention allocation theory to bear on the design of RAG and context management strategies.
4. **Agent evaluation under the sciences-of-the-artificial framework**: Shifting Agent performance evaluation from "internal capability testing" to "inner-outer match evaluation" — the performance difference of the same Agent across different environments (toolsets, prompts, feedback mechanisms) may well exceed the performance difference between different Agents in the same environment.

### 9.3 Machines of Bounded Rationality

Let me close with Simon's own words from *The Sciences of the Artificial*<sup>[10]</sup>:

> *"An artifact can be thought of as a meeting point — an 'interface' in today's terms — between an 'inner' environment, the substance and organization of the artifact itself, and an 'outer' environment, the surroundings in which it operates. If the inner environment is appropriate to the outer environment, or vice versa, the artifact will serve its intended purpose."*

Contemporary AI Agents are the first machines of genuine "bounded rationality" that humanity has built. They face the same categories of constraints as human decision-makers — limited information, limited computation, limited attention. The theoretical framework that Simon devoted his life to studying offers a profoundly underutilized intellectual resource for understanding and improving these machines.

But as Chapter VIII argued, Simon's framework also has its boundaries: it presupposes a stable reasoning agent, while LLM Agents are dynamic systems whose structure emerges from interaction itself. On the solved problems, Simon left us a precise map; on the unsolved ones, he left us a precise outline — marking exactly the blank spaces that the next generation of Agent cognitive theory must fill.

The future of Agent systems lies not in choosing between Simon and beyond-Simon, but in this: **stop groping in the places he already illuminated, and concentrate the searchlight on the regions he marked as dark.**

---

## References

[1] Simon, H. A. (1947). *Administrative Behavior: A Study of Decision-Making Processes in Administrative Organization*. Macmillan. (4th ed.: 1997, Free Press)

[2] Liu, N. F., Lin, K., Hewitt, J., Paranjape, A., Bevilacqua, M., Petroni, F., & Liang, P. (2024). Lost in the Middle: How Language Models Use Long Contexts. *Transactions of the Association for Computational Linguistics*, 12, 157–173.

[3] Simon, H. A. (1971). Designing Organizations for an Information-Rich World. In M. Greenberger (Ed.), *Computers, Communications, and the Public Interest* (pp. 37–72). Johns Hopkins Press.

[4] Newell, A., & Simon, H. A. (1972). *Human Problem Solving*. Prentice-Hall.

[5] Yao, S., Zhao, J., Yu, D., Du, N., Shafran, I., Narasimhan, K., & Cao, Y. (2023). ReAct: Synergizing Reasoning and Acting in Language Models. In *ICLR 2023*.

[6] Simon, H. A. (1990). Invariants of Human Behavior. *Annual Review of Psychology*, 41, 1–19.

[7] Chase, W. G., & Simon, H. A. (1973). Perception in Chess. *Cognitive Psychology*, 4(1), 55–81.

[8] Simon, H. A. (1962). The Architecture of Complexity. *Proceedings of the American Philosophical Society*, 106(6), 467–482.

[9] Xu, B., Peng, Z., Lei, B., Mukherjee, S., Liu, Y., & Xu, D. (2023). ReWOO: Decoupling Reasoning from Observations for Efficient Augmented Language Models. *arXiv preprint arXiv:2305.18323*.

[10] Simon, H. A. (1969). *The Sciences of the Artificial*. MIT Press. (3rd ed.: 1996)

[11] Newell, A. (1990). *Unified Theories of Cognition*. Harvard University Press.

[12] Shinn, N., Cassano, F., Gopinath, A., Narasimhan, K., & Yao, S. (2023). Reflexion: Language Agents with Verbal Reinforcement Learning. In *NeurIPS 2023*.

[13] Wang, G., Xie, Y., Jiang, Y., Mandlekar, A., Xiao, C., Zhu, Y., Fan, L., & Anandkumar, A. (2023). Voyager: An Open-Ended Embodied Agent with Large Language Models. *arXiv preprint arXiv:2305.16291*.

[14] March, J. G., & Simon, H. A. (1958). *Organizations*. Wiley.

[15] Kahneman, D. (2011). *Thinking, Fast and Slow*. Farrar, Straus and Giroux.

[16] Goyal, A., & Bengio, Y. (2022). Inductive Biases for Deep Learning of Higher-Level Cognition. *Proceedings of the Royal Society A*, 478(2266), 20210068.

[17] Wei, J., Wang, X., Schuurmans, D., Bosma, M., Ichter, B., Xia, F., Chi, E., Le, Q., & Zhou, D. (2022). Chain-of-Thought Prompting Elicits Reasoning in Large Language Models. In *NeurIPS 2022*.

</div>
