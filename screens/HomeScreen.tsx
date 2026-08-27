import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import FeatureCard from '../components/FeatureCard';
import ImpactPill from '../components/ImpactPill';
import NativeActionButton from '../components/NativeActionButton';
import SectionLabel from '../components/SectionLabel';
import { colors, radius, spacing } from '../styles/theme';

type Info = { tag: string; title: string; description: string; icon: React.ComponentProps<typeof Ionicons>['name'] };

const infoMap: Record<string, Info> = {
  discard: { tag: 'Impacto', title: 'Menos descarte significa menos desperdício.', description: 'Ao prolongar o uso de objetos, reduzimos resíduos e aproveitamos melhor recursos já existentes.', icon: 'trash-outline' },
  moreReuse: { tag: 'Benefício', title: 'Mais reutilização, mais valor para o que já existe.', description: 'Reutilizar ajuda a diminuir compras desnecessárias e estimula hábitos mais sustentáveis.', icon: 'refresh-outline' },
  reuse: { tag: 'Reutilização', title: 'Dar continuidade à vida útil dos produtos.', description: 'A reutilização reduz o descarte prematuro e evita substituições sem necessidade.', icon: 'repeat-outline' },
  connect: { tag: 'Conexão', title: 'Aproximar pessoas e novas possibilidades.', description: 'A ReUse busca aproximar quem possui um item parado de quem pode dar um novo uso a ele.', icon: 'people-outline' },
  conscious: { tag: 'Consumo consciente', title: 'Escolher melhor antes de comprar ou descartar.', description: 'Consumir conscientemente é avaliar necessidade, durabilidade e possibilidades de reaproveitamento.', icon: 'earth-outline' },
  cycle: { tag: 'Ciclo ReUse', title: 'Antes de descartar, pense em um novo destino.', description: 'O ciclo ReUse parte de uma ideia simples: identificar, reutilizar, conectar e transformar hábitos de consumo.', icon: 'sync-outline' }
};

export default function HomeScreen() {
  const [aboutVisible, setAboutVisible] = useState(false);
  const [info, setInfo] = useState<Info | null>(null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View style={styles.brandGroup}>
            <View style={styles.logo}><Ionicons name="leaf" size={22} color={colors.white} /></View>
            <View><Text style={styles.brand}>ReUse</Text><Text style={styles.brandSubtitle}>consumo que faz sentido</Text></View>
          </View>
          <Pressable onPress={() => setInfo(infoMap.cycle)} style={({pressed}) => [styles.recycleIcon, pressed && styles.pressed]}>
            <Ionicons name="sync" size={20} color={colors.primary} />
          </Pressable>
        </View>

        <View style={styles.hero}>
          <SectionLabel text="Economia sustentável" />
          <Text style={styles.heroTitle}>Dê uma nova vida ao que você já tem.</Text>
          <Text style={styles.heroDescription}>O ReUse conecta pessoas e incentiva a reutilização de produtos, ajudando a reduzir desperdícios e tornar o consumo mais consciente.</Text>

          <View style={styles.pillsRow}>
            <ImpactPill icon="trash-outline" label="Menos descarte" onPress={() => setInfo(infoMap.discard)} />
            <ImpactPill icon="refresh-outline" label="Mais reutilização" onPress={() => setInfo(infoMap.moreReuse)} />
          </View>

          <NativeActionButton title="Conhecer o ReUse" onPress={() => setAboutVisible(true)} />

          <View style={styles.heroVisual}>
            <View style={styles.orbitLarge}>
              <View style={styles.orbitMedium}>
                <View style={styles.heroIconCircle}><Ionicons name="leaf-outline" size={50} color={colors.primary} /></View>
              </View>
            </View>
            <View style={[styles.floatingBadge, styles.badgeTop]}><Ionicons name="cube-outline" size={16} color={colors.primary} /><Text style={styles.floatingText}>reutilize</Text></View>
            <View style={[styles.floatingBadge, styles.badgeBottom]}><Ionicons name="heart-outline" size={16} color={colors.primary} /><Text style={styles.floatingText}>compartilhe</Text></View>
          </View>
        </View>

        <View style={styles.problemSection}>
          <View style={styles.problemHeader}>
            <View style={styles.problemIcon}><Ionicons name="alert-circle-outline" size={21} color={colors.primary} /></View>
            <Text style={styles.problemEyebrow}>O problema</Text>
          </View>
          <Text style={styles.problemTitle}>Produtos úteis ainda são descartados todos os dias.</Text>
          <Text style={styles.problemText}>Muitos objetos em boas condições deixam de ser usados e acabam no lixo. Isso aumenta a geração de resíduos e estimula a compra de novos produtos sem necessidade.</Text>
        </View>

        <View style={styles.featuresSection}>
          <SectionLabel text="Nossa proposta" />
          <Text style={styles.sectionTitle}>Pequenas escolhas, um impacto maior.</Text>
          <View style={styles.featuresGrid}>
            <FeatureCard icon="repeat-outline" title="Reutilizar" description="Prolongar a vida útil de objetos que ainda podem ser aproveitados." onPress={() => setInfo(infoMap.reuse)} />
            <FeatureCard icon="people-outline" title="Conectar" description="Aproximar pessoas interessadas em dar novos destinos aos produtos." onPress={() => setInfo(infoMap.connect)} />
            <FeatureCard icon="earth-outline" title="Conscientizar" description="Estimular decisões de consumo mais responsáveis e sustentáveis." onPress={() => setInfo(infoMap.conscious)} />
          </View>
        </View>

        <View style={styles.quoteCard}>
          <View style={styles.quoteIcon}><Ionicons name="sparkles-outline" size={20} color={colors.primary} /></View>
          <View style={{flex: 1}}>
            <Text style={styles.quoteTitle}>Reutilize. Compartilhe. Transforme.</Text>
            <Text style={styles.quoteText}>Antes de descartar, pense em uma nova possibilidade.</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>ReUse • Visão inicial da plataforma • Sprint 1</Text>
        </View>
      </ScrollView>

      <Modal visible={aboutVisible} transparent animationType="fade" onRequestClose={() => setAboutVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View style={styles.modalIcon}><Ionicons name="leaf" size={22} color={colors.white} /></View>
              <Pressable onPress={() => setAboutVisible(false)} style={styles.closeButton}><Ionicons name="close" size={23} color={colors.primary} /></Pressable>
            </View>
            <SectionLabel text="Como funciona" />
            <Text style={styles.modalTitle}>Um novo destino começa com uma escolha.</Text>
            <Text style={styles.modalDescription}>O ReUse foi pensado para facilitar escolhas mais conscientes antes que um produto ainda útil seja descartado.</Text>
            {[
              ['1','Reutilize','Identifique produtos que ainda podem continuar sendo usados.'],
              ['2','Conecte','Encontre novas possibilidades e pessoas interessadas nesses itens.'],
              ['3','Transforme','Reduza desperdícios e incentive um ciclo de consumo mais consciente.']
            ].map(([n,t,d]) => (
              <View key={n} style={styles.step}>
                <View style={styles.stepNumber}><Text style={styles.stepNumberText}>{n}</Text></View>
                <View style={{flex:1}}><Text style={styles.stepTitle}>{t}</Text><Text style={styles.stepText}>{d}</Text></View>
              </View>
            ))}
            <NativeActionButton title="Entendi" onPress={() => setAboutVisible(false)} />
          </View>
        </View>
      </Modal>

      <Modal visible={!!info} transparent animationType="fade" onRequestClose={() => setInfo(null)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View style={styles.infoIcon}><Ionicons name={info?.icon ?? 'leaf-outline'} size={26} color={colors.primary} /></View>
              <Pressable onPress={() => setInfo(null)} style={styles.closeButton}><Ionicons name="close" size={23} color={colors.primary} /></Pressable>
            </View>
            <SectionLabel text={info?.tag ?? 'ReUse'} />
            <Text style={styles.modalTitle}>{info?.title}</Text>
            <Text style={styles.modalDescription}>{info?.description}</Text>
            <NativeActionButton title="Voltar" onPress={() => setInfo(null)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:{flex:1,backgroundColor:colors.background},
  container:{width:'100%',maxWidth:1040,alignSelf:'center',paddingHorizontal:spacing.lg,paddingTop:spacing.md,paddingBottom:spacing.xl,gap:spacing.xl},
  header:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},
  brandGroup:{flexDirection:'row',alignItems:'center',gap:spacing.sm},
  logo:{width:44,height:44,borderRadius:15,backgroundColor:colors.primary,alignItems:'center',justifyContent:'center'},
  brand:{color:colors.primary,fontSize:21,fontWeight:'900'},
  brandSubtitle:{color:colors.textMuted,fontSize:10.5},
  recycleIcon:{width:40,height:40,borderRadius:14,backgroundColor:colors.surface,borderWidth:1,borderColor:colors.border,alignItems:'center',justifyContent:'center'},
  pressed:{opacity:.72},
  hero:{backgroundColor:colors.surface,borderWidth:1,borderColor:colors.border,borderRadius:radius.lg,padding:spacing.lg,gap:spacing.md},
  heroTitle:{color:colors.primary,fontSize:38,lineHeight:42,fontWeight:'900',letterSpacing:-1.2},
  heroDescription:{color:colors.textMuted,fontSize:15,lineHeight:23},
  pillsRow:{flexDirection:'row',flexWrap:'wrap',gap:spacing.sm},
  heroVisual:{height:210,borderRadius:radius.lg,backgroundColor:colors.surfaceSoft,alignItems:'center',justifyContent:'center',overflow:'hidden',position:'relative'},
  orbitLarge:{width:200,height:200,borderRadius:100,borderWidth:1,borderColor:'#C9DAC7',alignItems:'center',justifyContent:'center'},
  orbitMedium:{width:145,height:145,borderRadius:73,borderWidth:1,borderColor:'#B7D2B3',alignItems:'center',justifyContent:'center'},
  heroIconCircle:{width:94,height:94,borderRadius:47,backgroundColor:colors.accentSoft,alignItems:'center',justifyContent:'center'},
  floatingBadge:{position:'absolute',flexDirection:'row',alignItems:'center',gap:6,backgroundColor:colors.white,borderWidth:1,borderColor:colors.border,borderRadius:radius.pill,paddingHorizontal:11,paddingVertical:7},
  badgeTop:{top:26,right:22},badgeBottom:{left:24,bottom:28},
  floatingText:{color:colors.primary,fontSize:11,fontWeight:'700'},
  problemSection:{backgroundColor:colors.warningSoft,borderRadius:radius.lg,padding:spacing.lg,gap:spacing.sm},
  problemHeader:{flexDirection:'row',alignItems:'center',gap:spacing.sm},
  problemIcon:{width:38,height:38,borderRadius:13,backgroundColor:'#FFE9AF',alignItems:'center',justifyContent:'center'},
  problemEyebrow:{color:colors.primarySoft,fontSize:12,fontWeight:'800',textTransform:'uppercase',letterSpacing:.8},
  problemTitle:{color:colors.text,fontSize:23,lineHeight:29,fontWeight:'900'},
  problemText:{color:colors.textMuted,fontSize:14,lineHeight:22},
  featuresSection:{gap:spacing.md},
  sectionTitle:{color:colors.text,fontSize:26,lineHeight:32,fontWeight:'900'},
  featuresGrid:{flexDirection:'row',flexWrap:'wrap',gap:spacing.sm},
  quoteCard:{flexDirection:'row',alignItems:'center',gap:spacing.md,backgroundColor:colors.primary,borderRadius:radius.lg,padding:spacing.lg},
  quoteIcon:{width:44,height:44,borderRadius:15,backgroundColor:colors.accent,alignItems:'center',justifyContent:'center'},
  quoteTitle:{color:colors.white,fontSize:15,fontWeight:'800'},
  quoteText:{color:'#D9E5DF',fontSize:12.5,lineHeight:18},
  footer:{alignItems:'center',paddingTop:spacing.sm},
  footerText:{color:colors.textMuted,fontSize:10.5},
  modalOverlay:{flex:1,backgroundColor:'rgba(12,35,27,.58)',alignItems:'center',justifyContent:'center',padding:spacing.lg},
  modalCard:{width:'100%',maxWidth:520,backgroundColor:colors.surface,borderRadius:radius.lg,padding:spacing.lg,gap:spacing.md},
  modalHeader:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'},
  modalIcon:{width:44,height:44,borderRadius:15,backgroundColor:colors.primary,alignItems:'center',justifyContent:'center'},
  infoIcon:{width:50,height:50,borderRadius:17,backgroundColor:colors.accentSoft,alignItems:'center',justifyContent:'center'},
  closeButton:{width:40,height:40,borderRadius:14,backgroundColor:colors.surfaceSoft,alignItems:'center',justifyContent:'center'},
  modalTitle:{color:colors.primary,fontSize:26,lineHeight:31,fontWeight:'900'},
  modalDescription:{color:colors.textMuted,fontSize:14,lineHeight:21},
  step:{flexDirection:'row',gap:spacing.sm,backgroundColor:colors.surfaceSoft,borderRadius:radius.md,padding:spacing.md},
  stepNumber:{width:30,height:30,borderRadius:15,backgroundColor:colors.accentSoft,alignItems:'center',justifyContent:'center'},
  stepNumberText:{color:colors.primary,fontSize:12,fontWeight:'900'},
  stepTitle:{color:colors.text,fontSize:14,fontWeight:'800'},
  stepText:{color:colors.textMuted,fontSize:12.5,lineHeight:18}
});
