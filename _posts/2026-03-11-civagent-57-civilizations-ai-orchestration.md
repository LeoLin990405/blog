---
layout: post
title: "历史学在 AI 时代的新角色：从治国智慧到 Agent 编排——CivAgent 的理论基础与实践"
date: 2026-03-11
tags: [AI, Multi-Agent, History, Political Science, Open Source]
---

> *「任何一个制度之建立，必有其当时的需要，亦必有其当时的用意。我们不能用后代的眼光来批评前代的制度。」*
> *—— 钱穆《中国历代政治得失》*

今天开源了 [CivAgent](https://github.com/LeoLin990405/CivAgent)——一个将人类历史上 57 种经典政体映射为 AI 多 Agent 协作架构的项目。但这篇文章不只是项目介绍，更想探讨一个被严重低估的问题：**在大语言模型和多 Agent 系统快速发展的今天，历史学——尤其是制度史和比较政治学——能为 AI 系统设计提供什么独特的知识贡献？**

这不是一个修辞性的问题。我的答案是：历史学提供了人类已经用数千年时间验证过的「组织架构设计模式库」，而这个模式库对当下的 AI 多 Agent 编排具有直接的参考价值。

---

## 一、问题的提出：多 Agent 系统的架构困境

多 Agent 系统（Multi-Agent Systems, MAS）研究中有一个长期的核心挑战：**如何设计 Agent 之间的通信拓扑和决策协议？**

Wooldridge 和 Jennings（1995）在其经典综述中指出，MAS 的核心问题在于协调（coordination）、合作（cooperation）和冲突解决（conflict resolution）<sup>[1]</sup>。Dorri 等人（2018）在更近的综述中进一步将 MAS 架构分为集中式（centralized）、分布式（distributed）和混合式（hybrid），但也承认：大多数现有研究要么假设完全集中的协调者，要么假设完全对等的分布式结构——而真实的组织架构远比这两个极端丰富<sup>[2]</sup>。

这个「架构选择」问题在 LLM Agent 时代变得更加尖锐。当我们有了 Claude、GPT、Gemini、DeepSeek、Kimi 等多种 AI 模型可供编排时，一个自然的问题是：**它们之间应该用什么拓扑结构来协作？谁来决策？谁来审核？谁来执行？信息如何流动？**

答案是：**这取决于任务场景。** 而人类历史上的政治制度，恰恰是在不同场景下对这些问题的系统性回答。

## 二、制度史作为「架构设计模式库」

### 2.1 钱穆的制度演化论

钱穆先生在《中国历代政治得失》（1952）中系统分析了汉、唐、宋、明、清五代的政治制度<sup>[3]</sup>。他的核心方法论不是简单地评价制度好坏，而是追问：**每一套制度在它的历史语境下为什么是那样设计的、解决了什么问题、又留下了什么隐患。**

他发现了一个贯穿中国制度史的「迭代模式」：

1. **汉代三公九卿制**：丞相统管百官，权力高度集中。问题：丞相权力过大，皇权被架空的风险。
2. **唐代三省六部制**：中书省起草 → 门下省审核 → 尚书省执行。制度回应：用流程制衡取代个人集权。问题：门下省封驳权过大，决策效率降低。
3. **宋代二府三司制**：削弱相权，设枢密院分管军事，三司使分管财政。制度回应：进一步分散权力。问题：「冗官冗兵」，行政效率极低。
4. **明代内阁+司礼监**：内阁票拟（拟定意见）→ 司礼监批红（代皇帝审批）。制度回应：双轨制提速。问题：宦官干政。
5. **清代军机处**：皇帝直接与军机大臣面对面商议。制度回应：绕过所有中间层，极致效率。问题：全靠皇帝个人能力。

这个「问题 → 制度回应 → 新问题 → 新制度」的迭代逻辑，**在结构上等价于软件工程中的架构演进**。每一次制度变革都是一次「重构」——保留上一版的优点，修复已知的缺陷，但不可避免地引入新的权衡。

### 2.2 比较政治学的跨文明视角

如果说钱穆提供了纵向的演化视角，那么比较政治学提供了横向的比较视角。

S.N. 艾森施塔特（Eisenstadt）在《帝国的政治体系》（1963）中系统比较了人类历史上主要帝国的政治结构<sup>[4]</sup>，发现不同帝国在面对相似问题时，由于文化、地理、经济条件的不同，发展出了截然不同的制度解决方案。例如：

- **波斯帝国**选择了总督制（satrapy）——给予地方极大自治权，通过「王道」（Royal Road）和「王之耳目」（King's Eyes and Ears）维持最低限度的一致性。
- **罗马共和国**选择了双执政官+元老院——两个最高执行官互相制衡，元老院提供集体智慧。
- **蒙古帝国**选择了忽里勒台（Khuriltai）——部落首领集体推选大汗，结合了军事效率和部落共识。

弗朗西斯·福山（Fukuyama）在《政治秩序的起源》（2011）中提出了理解政治制度的三个维度<sup>[5]</sup>：

1. **国家能力**（State Capacity）：政府有效执行政策的能力
2. **法治**（Rule of Law）：对权力的制度化约束
3. **民主问责**（Democratic Accountability）：统治者对被治者的回应性

福山的核心发现是：**这三个维度之间存在深刻的张力，没有任何政体能同时将三者最大化。** 不同政体的差异，本质上是在这三者之间做出的不同取舍。

### 2.3 映射：政治制度 → Agent 编排

当我们将这些政治学概念映射到 AI 多 Agent 系统时，福山的三维度框架可以精确地翻译为：

| 政治维度 | AI 编排维度 | 说明 |
|---------|-----------|------|
| 国家能力 | **执行效率** | Agent 系统完成任务的速度和一致性 |
| 法治 | **错误预防** | 通过制度化的审核流程保障输出质量 |
| 民主问责 | **参与广度** | 多少 Agent 参与决策过程 |

这三者构成了一个「不可能三角」——这正是亨廷顿（Huntington）在《变化社会中的政治秩序》（1968）中反复强调的核心张力<sup>[6]</sup>。CivAgent 的 57 种政体，就是人类历史上对这个「不可能三角」的 57 种不同回答。

## 三、六种编排模式的理论基础

从 57 种政体中，我提炼出 6 种核心编排模式。这 6 种模式并非随意归纳，而是与亨利·明茨伯格（Mintzberg）在《组织的结构》（1979）中提出的五种组织形态高度同构<sup>[7]</sup>，同时也回应了亚里士多德以来 2400 年政体分类学传统<sup>[8]</sup>。

### 3.1 中央集权模式（Centralized）

**代表政体**：秦（三公九卿）、元（行省制）、法国绝对君主制、苏联（政治局制）、拿破仑帝国、普鲁士（军事官僚制）、孔雀王朝（政事论制）

**AI 实现**：单一 main agent 统管所有 sub-agent，命令链清晰，执行迅速。

**理论基础**：查尔斯·蒂利（Tilly）在《强制、资本与欧洲国家》（1990）中指出，国家形态的演变本质上是**强制力集中程度与社会复杂度之间的博弈**<sup>[9]</sup>。在 Agent 编排中，集中控制能保证一致性和速度，但会成为瓶颈。秦朝用极致的中央集权统一了六国，但也因缺乏纠错机制而二世而亡——这对 AI 系统的启示是：**纯集权模式适合短期紧急任务，但长期运行需要某种制衡机制。**

对应明茨伯格的「简单结构」（Simple Structure）——权力集中于一个战略顶点，几乎没有中间层级。

**适用场景**：紧急任务、需要快速一致决策、短期项目冲刺。

### 3.2 制衡模式（Checks & Balances）

**代表政体**：唐（三省六部）、宋（二府三司）、隋（三省制衡原型）、罗马共和国、美国联邦、威尼斯共和国、朝鲜王朝（三司言谏）、迦太基

**AI 实现**：多个顶层 Agent 互相审核——起草者不能自己批准，审核者不能自己执行。信息必须经过多个独立节点才能流入执行阶段。

**理论基础**：孟德斯鸠（Montesquieu）在《论法的精神》（1748）中奠定了分权制衡的理论基础<sup>[10]</sup>。在 AI 编排中，制衡的优势在于质量保障，但代价是显著的交互成本。

这与罗纳德·科斯（Coase）的交易成本理论完全一致<sup>[11]</sup>：制衡越多，每个决策的「交易成本」就越高。宋朝的二府三司制是制衡的极致——文官互相牵制到了「冗官冗兵」的地步，以至于王安石变法的核心诉求之一就是减少制衡、提高效率<sup>[12]</sup>。在 AI 编排中，这意味着制衡模式适合「宁可慢也不能错」的高风险场景（如代码安全审查、金融合规），不适合快速迭代的场景。

唐朝三省六部制的「中书起草 → 门下审核（可驳回）→ 尚书执行」是这种模式最经典的实现。门下省的封驳权（即「否决权」）确保了任何低质量的决策在进入执行阶段之前就被拦截——这在 AI 系统中等价于一个**质量门控 Agent**。

**适用场景**：高质量要求、防错场景、代码审查、合规检查。

### 3.3 双轨模式（Dual Power）

**代表政体**：明（内阁票拟+司礼监批红）、斯巴达（双王制）、辽（南北面官制）、哈布斯堡（二元君主制）

**AI 实现**：两个 main 级 Agent 各管一条决策线，交叉审批。内阁拟定方案，司礼监代表另一条权力线进行审批。

**理论基础**：黄仁宇在《万历十五年》（1981）中从微观视角展示了明朝内阁与司礼监的双轨制如何运作<sup>[13]</sup>。这种「票拟→批红」的流程实质上是一种**双重验证机制**——两个独立的决策链路各自评估同一份方案，降低了单一链路的系统性偏差风险。

辽朝的南北面官制更为特殊——南面官管理汉人事务（采用唐制），北面官管理契丹事务（沿用部落制），两套官僚体系并行不悖<sup>[14]</sup>。这种设计在 AI 系统中等价于**针对不同类型任务使用不同编排逻辑的混合架构**。

**适用场景**：需要双重审批、两条产品线并行、跨领域任务。

### 3.4 联邦模式（Federated）

**代表政体**：周（宗法分封）、三国（三国并立）、五代十国、神圣罗马帝国（选帝侯）、波斯帝国（总督制）、波兰立陶宛联邦

**AI 实现**：独立 Agent 组自治运行，最小化跨组协调。每个 Agent 组有自己的决策权，只在必要时与中央协调。

**理论基础**：分布式系统中的 CAP 定理（一致性、可用性、分区容错不可兼得）在古代政治中有一个完美的对应物：**中央控制力、地方灵活性、通信效率**不可能同时最大化。

周朝的分封制选择了「高地方灵活性 + 低中央控制力」，代价是最终的春秋战国分裂<sup>[15]</sup>。波斯帝国的总督制是一个精妙的折中——总督拥有极大自治权，但通过「王道」和「王之耳目」维持最低限度的一致性<sup>[16]</sup>。

Peter Wilson（2016）在研究神圣罗马帝国时指出，这种看似「松散」的联邦结构之所以能存续 800 多年，恰恰是因为它在「帝国统一」和「诸侯自治」之间找到了一个可持续的平衡点<sup>[17]</sup>。

**适用场景**：多团队并行、微服务架构、各子任务独立性高。

### 3.5 民主议会模式（Democratic Council）

**代表政体**：雅典（直接民主）、蒙古（忽里勒台）、维京（庭议制）、瑞士（直接民主+合议制）、欧盟（三方共决）

**AI 实现**：所有 Agent 平等参与决策，通过投票或共识机制选择最优方案。

**理论基础**：阿罗不可能定理（Arrow's Impossibility Theorem, 1951）证明了：在三个或以上选项之间，不存在同时满足所有公平性条件的投票规则<sup>[18]</sup>。雅典民主、蒙古忽里勒台、维京庭议都面对过这个问题，并用不同方式来缓解——雅典用抽签（sortition）<sup>[19]</sup>、蒙古用共识决、维京用庭议辩论。

在 AI 编排中，民主模式的主要价值不在于「投票」本身，而在于**强制所有 Agent 表达独立观点**。这类似于机器学习中的集成学习（ensemble learning）思路：多个弱分类器的组合往往优于单个强分类器<sup>[20]</sup>。

Josiah Ober（1989）对雅典民主的研究表明，直接民主制度之所以在军事和经济上优于同时期的寡头政体，核心原因不是「多数人比少数人聪明」，而是**信息聚合**——公民大会迫使分散在城邦各处的地方知识被汇聚到一个决策点<sup>[21]</sup>。这对 AI 系统的启示是：当任务需要整合多种视角和知识源时，民主模式可能优于集权模式。

**适用场景**：头脑风暴、创意方案探索、需要多角度分析的决策。

### 3.6 神权模式（Theocratic）

**代表政体**：商（神权贵族制）、太平天国（天王制）、古埃及（法老神权制）、拜占庭（神权独裁制）、萨法维帝国（什叶派神权君主制）、高棉帝国（神王制）

**AI 实现**：最高 Agent 拥有绝对权威，其他 Agent 完全服从。没有审核环节，决策即执行。

**理论基础**：卡尔·魏特夫（Wittfogel）在《东方专制主义》（1957）中分析了「水利帝国」与集权的关系<sup>[22]</sup>——大规模灌溉工程需要高度集中的指挥权，这催生了绝对权威的组织形态。在 AI 编排中，这对应于**需要强力统一行动的危机场景**。

这种模式的优势在于决策速度和执行一致性达到极致，代价是完全依赖最高 Agent 的能力——如果它犯错，没有任何纠正机制。商朝的神权政治依赖占卜（甲骨文），实质上是用外部随机性来弥补个人决策的局限<sup>[23]</sup>。

**适用场景**：紧急危机处理、需要绝对一致性的部署操作。

## 四、跨学科的理论桥梁

### 4.1 组织理论：明茨伯格的五种形态

亨利·明茨伯格（Mintzberg）在《组织的结构》（1979）中提出了五种基本的组织形态<sup>[7]</sup>。这五种形态与 CivAgent 的六种编排模式之间存在高度的结构同构：

| 明茨伯格组织形态 | CivAgent 编排模式 | 核心机制 |
|----------------|-----------------|---------|
| 简单结构（Simple Structure） | 中央集权 / 神权 | 战略顶点直接监督 |
| 机械官僚制（Machine Bureaucracy） | 制衡 | 标准化工作流程 |
| 专业官僚制（Professional Bureaucracy） | 双轨 | 专业技能标准化 |
| 事业部制（Divisionalized Form） | 联邦 | 输出标准化 |
| 临时体制（Adhocracy） | 民主议会 | 相互调适 |

### 4.2 有限理性与制度设计

赫伯特·西蒙（Herbert Simon）在《管理行为》（1947）中提出的「有限理性」（bounded rationality）概念<sup>[24]</sup>可以完美解释为什么不同的政体在不同情境下各有优劣——没有一个 Agent（或人类决策者）能够获得完全信息并做出最优决策，因此制度设计的核心就是**在信息不完全的约束下，设计出最有效的决策流程**。

- 秦朝的集权适合**信息流动快、决策紧急**的场景
- 唐朝的制衡适合**信息复杂、需要多角度审核**的场景
- 周朝的联邦适合**信息分散、各区域差异大**的场景
- 雅典的民主适合**需要聚合分散知识**的场景

### 4.3 制度经济学：制度作为约束

道格拉斯·诺斯（Douglass North）在《制度、制度变迁与经济绩效》（1990）中指出：**制度是人类设计的约束，用来塑造人际互动**<sup>[25]</sup>。

在 CivAgent 中，这个定义可以精确对应：

| 诺斯的制度概念 | CivAgent 配置 | 作用 |
|-------------|-------------|------|
| 非正式约束（文化规范） | `SOUL.md` | 定义 Agent 的行为准则和语言风格 |
| 正式规则（法律制度） | `IDENTITY.md` | 定义角色权限和组织架构 |
| 执行机制 | `openclaw.json` | 定义通信规则和决策流程 |

每一种政体，就是一套完整的「制度设计方案」——文化规范 + 正式规则 + 执行机制的组合。

### 4.4 亨廷顿的「不可能三角」

塞缪尔·亨廷顿（Huntington）在《变化社会中的政治秩序》（1968）中反复强调<sup>[6]</sup>：**政治参与的扩大、制度化的加深、执行效率的提高**三者之间存在深刻的张力。

这正是 CivAgent 六种模式所覆盖的设计空间：

```
            执行效率（国家能力）
                 ▲
                 │
    神权模式  ●  │  ● 中央集权
                 │
                 │       ● 双轨
                 │
    ─────────────┼────────────────► 错误预防（法治）
                 │
         ● 联邦  │  ● 制衡
                 │
                 │
    民主议会  ●  │
                 │
                 ▼
            参与广度（民主问责）
```

## 五、CivAgent 的具体实现

### 5.1 架构

每种文明由 5 个配置文件组成，零代码修改即可切换：

| 文件 | 作用 | 制度学对应 |
|------|------|-----------|
| `metadata.json` | 机器可读的元数据 | 政体的基本信息 |
| `openclaw.json.template` | Agent 配置模板 | 正式制度规则 |
| `SOUL.md` | 行为准则与语言风格 | 非正式文化规范 |
| `IDENTITY.md` | 组织架构图与角色映射 | 官僚体系设计 |
| `README.md` | 历史背景与使用说明 | 制度史文献 |

### 5.2 覆盖范围

**20 个中华朝代**（从夏 c.2070 BC 到太平天国 1864）：

夏、商、周、秦、汉、三国、晋、南北朝、隋、唐、五代十国、宋、辽、金、西夏、元、明、清、中华民国、太平天国

**37 个世界帝国**（从苏美尔 c.4500 BC 到欧盟 1993-至今）：

苏美尔、古埃及、雅典、斯巴达、波斯、迦太基、孔雀王朝、罗马共和国、罗马帝国、拜占庭、阿拔斯哈里发、维京、神圣罗马帝国、蒙古、威尼斯、马里、高棉、奥斯曼、萨法维、莫卧儿、朝鲜、日本幕府、波兰联邦、法国绝对制、英国议会制、俄罗斯沙皇制、哈布斯堡、普鲁士、拿破仑、美国联邦、明治日本、苏联、欧盟、瑞士、印加、阿兹特克、祖鲁

### 5.3 使用

```bash
git clone https://github.com/LeoLin990405/civagent.git
cd civagent

# 列出所有文明
./scripts/list-regimes.sh

# 一行命令切换
./scripts/switch-regime.sh china/tang      # 唐·三省制衡
./scripts/switch-regime.sh china/qin       # 秦·中央集权
./scripts/switch-regime.sh global/athens   # 雅典·直接民主
./scripts/switch-regime.sh china/ming      # 明·双轨制
./scripts/switch-regime.sh global/venice   # 威尼斯·反腐制衡

# 重启生效
openclaw gateway restart
```

## 六、历史学在 AI 时代的独特价值

回到本文最初的问题：历史学能为 AI 系统设计提供什么？

我认为至少有三个层面：

### 6.1 作为「已验证的设计模式库」

软件工程中的「设计模式」（GoF, 1994）<sup>[26]</sup>总结了面向对象编程中反复出现的解决方案。类似地，人类 5000 年的政治制度史是一部**组织架构设计模式库**——每种政体都经历了创建、运行、优化、衰败的完整生命周期，其成败得失有丰富的历史文献记录。

与计算机科学中的设计模式不同，政治制度的「设计模式」经过了**数十年到数百年的实际运行检验**，其优劣势在极端条件下（战争、饥荒、政变、扩张）都被充分暴露。这种规模的「压力测试」是任何软件系统在实验室条件下无法复制的。

### 6.2 作为「反直觉发现的来源」

历史经常提供违背直觉的发现。例如：

- **威尼斯共和国**存续了 1100 年（697-1797），是人类历史上最长寿的共和政体之一。其核心不是效率，而是**极其复杂的反腐制衡机制**——总督的权力被大议会、十人委员会、三人领导层层限制<sup>[27]</sup>。这提示我们：在长期运行的 AI 系统中，**过度制衡可能比不够制衡更有利于系统的稳定性**。

- **蒙古帝国**在极短时间内征服了人类历史上最大的连续领土，但其决策机制不是独裁而是**忽里勒台（集体议事）**<sup>[28]</sup>。这提示我们：军事效率和民主决策并不一定矛盾。

- **波兰立陶宛联邦**的「自由否决权」（Liberum Veto）——任何一个议员都可以否决任何决议——最终导致了国家的灭亡<sup>[29]</sup>。这对分布式系统的启示是：**共识要求过高等于没有共识**。

这些反直觉的历史发现，是纯理论推导难以得出的，它们来自于历史的「实验」。

### 6.3 作为「权衡意识的培养」

或许最重要的是，历史学培养了一种深刻的**权衡意识**——没有完美的制度，只有在特定条件下最适合的制度。

正如钱穆先生所言：「制度本身必须活的存在，不能刻板不变。」亚里士多德在《政治学》中的核心洞见也是：**最好的政体取决于具体的情境和目的**<sup>[8]</sup>。

CivAgent 的 57 种政体不是为了找到「最好的」编排模式，而是为了建立一个**组织架构的可选项空间**——当你面对不同的 AI 任务场景时，可以从人类历史中找到经过时间检验的参考方案。

## 七、结语

> *「世界历史可以这样总结：当国家强大时，它们并不总是公正的；而当它们希望做到公正时，它们往往已不再强大。」*
> *—— 温斯顿·丘吉尔*

AI 多 Agent 系统正在快速发展，但「如何编排多个 Agent 的协作」这个问题，人类已经思考了至少 2400 年（从亚里士多德算起）。政治制度史、比较政治学、组织理论提供了丰富的知识储备，等待被迁移到 AI 系统设计领域。

CivAgent 是这种迁移的一次实验。它的核心假设是：**历史不只是过去的事，它是组织智慧的活化石。**

---

**项目地址**：[github.com/LeoLin990405/CivAgent](https://github.com/LeoLin990405/CivAgent)

**致谢**：没有 [@wanikua](https://github.com/wanikua) 的 [AI 朝廷](https://github.com/wanikua/boluobobo-ai-court-tutorial) 项目——首创性地将唐朝三省六部制与 AI 多 Agent 框架结合——就不会有 CivAgent。

---

## 参考文献

<small>

[1] Wooldridge, M. & Jennings, N. R. (1995). "Intelligent Agents: Theory and Practice." *The Knowledge Engineering Review*, 10(2), 115-152.

[2] Dorri, A., Kanhere, S. S., & Jurdak, R. (2018). "Multi-Agent Systems: A Survey." *IEEE Access*, 6, 28573-28593.

[3] 钱穆 (1952).《中国历代政治得失》. 台北：东大图书.

[4] Eisenstadt, S. N. (1963). *The Political Systems of Empires: The Rise and Fall of the Historical Bureaucratic Societies*. New York: Free Press.

[5] Fukuyama, F. (2011). *The Origins of Political Order: From Prehuman Times to the French Revolution*. New York: Farrar, Straus and Giroux.

[6] Huntington, S. P. (1968). *Political Order in Changing Societies*. New Haven: Yale University Press.

[7] Mintzberg, H. (1979). *The Structuring of Organizations: A Synthesis of the Research*. Englewood Cliffs, NJ: Prentice-Hall.

[8] Aristotle. *Politics*. Translated by C. D. C. Reeve (1998). Indianapolis: Hackett Publishing.

[9] Tilly, C. (1990). *Coercion, Capital, and European States, AD 990–1992*. Cambridge, MA: Blackwell.

[10] Montesquieu, C. (1748). *De l'esprit des lois* [The Spirit of the Laws]. Translated by A. Cohler et al. (1989). Cambridge: Cambridge University Press.

[11] Coase, R. H. (1937). "The Nature of the Firm." *Economica*, 4(16), 386-405.

[12] 邓广铭 (1975).《北宋政治改革家王安石》. 北京：人民出版社.

[13] 黄仁宇 (1981).《万历十五年》[*1587, A Year of No Significance*]. New Haven: Yale University Press.

[14] Wittfogel, K. A. & 冯家昇 (1949). *History of Chinese Society: Liao (907–1125)*. New York: Macmillan.

[15] 杨宽 (1998).《战国史》(增订本). 上海：上海人民出版社.

[16] Briant, P. (2002). *From Cyrus to Alexander: A History of the Persian Empire*. Winona Lake, IN: Eisenbrauns.

[17] Wilson, P. H. (2016). *Heart of Europe: A History of the Holy Roman Empire*. Cambridge, MA: Harvard University Press.

[18] Arrow, K. J. (1951). *Social Choice and Individual Values*. New York: Wiley.

[19] Hansen, M. H. (1991). *The Athenian Democracy in the Age of Demosthenes: Structure, Principles, and Ideology*. Oxford: Blackwell.

[20] Dietterich, T. G. (2000). "Ensemble Methods in Machine Learning." *Multiple Classifier Systems*, LNCS 1857, 1-15.

[21] Ober, J. (1989). *Mass and Elite in Democratic Athens: Rhetoric, Ideology, and the Power of the People*. Princeton: Princeton University Press.

[22] Wittfogel, K. A. (1957). *Oriental Despotism: A Comparative Study of Total Power*. New Haven: Yale University Press.

[23] Keightley, D. N. (1978). *Sources of Shang History: The Oracle-Bone Inscriptions of Bronze Age China*. Berkeley: University of California Press.

[24] Simon, H. A. (1947). *Administrative Behavior: A Study of Decision-Making Processes in Administrative Organization*. New York: Macmillan.

[25] North, D. C. (1990). *Institutions, Institutional Change and Economic Performance*. Cambridge: Cambridge University Press.

[26] Gamma, E., Helm, R., Johnson, R., & Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Reading, MA: Addison-Wesley.

[27] Lane, F. C. (1973). *Venice: A Maritime Republic*. Baltimore: Johns Hopkins University Press.

[28] Weatherford, J. (2004). *Genghis Khan and the Making of the Modern World*. New York: Crown.

[29] Davies, N. (2005). *God's Playground: A History of Poland* (Revised ed., 2 vols.). New York: Columbia University Press.

</small>
